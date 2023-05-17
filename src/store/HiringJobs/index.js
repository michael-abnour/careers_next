import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AxiosInstance from '../../utils/AxiosInstance'

// get interview rounds
// *get Jobs
export const getInterviewRounds = createAsyncThunk('HiringJobs/getInterviewRounds', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get('recruit/interviewRounds/')
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.message
    })
  return data
})
export const getHiringJobs = createAsyncThunk('HiringJobs/getHiringJobs', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get('recruit/hiringJobs/')
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.message
    })
  return data
})
export const getOneHiringJob = createAsyncThunk('HiringJobs/getOneJob', async (jobId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get(`recruit/hiringJobs/${jobId}`)
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.status
    })
  return data
})

export const createJob = createAsyncThunk('HiringJobs/createJob', async (jobData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let resCode
  let finalResult
  const res = await AxiosInstance.post('recruit/hiringJobs/', jobData)
    .then(res => {
      resCode = res.status
      finalResult = res.data.data
    })
    .catch(er => {
      resCode = er.response.status
    })
  return { finalResult, resCode }
})
// * Edit Job
export const updateJob = createAsyncThunk('HiringJobs/updateJob', async ({ data, id }, thunkAPI) => {
  let finalResult
  let resCode
  const { rejectWithValue } = thunkAPI
  console.log(data)
  const res = await AxiosInstance.put(`recruit/hiringJobs/${id}`, data, {
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      roleId: JSON.parse(window.localStorage.getItem('userData')).roles[0].id
    }
  })
    .then(res => {
      resCode = res.status
    })
    .catch(er => {
      resCode = er.response.status
    })
  return { data, resCode }
})

// * Delete Job
export const deleteJob = createAsyncThunk('HiringJobs/deleteJob', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await AxiosInstance.delete(`recruit/hiringJobs/${id}`, {
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      roleId: JSON.parse(window.localStorage.getItem('userData')).roles[0].id
    }
  })
    .then(result => {
      if (result.status == 200) {
        toast.success('Job Deleted Successfully.', {
          duration: 2000
        })
      }
    })
    .catch(er => {
      toast.error('An Error Occurred !', {
        duration: 2000
      })
    })

  return id
})

const HiringJobsSlice = createSlice({
  name: 'Jobs',
  initialState: {
    HiringJobs: [],
    InterviewRounds: [],
    Job: {},
    loading: false,
    unAuthorized: '',
    responseCode: 0
  },
  reducers: {
    resetResCode: state => {
      state.responseCode = 0
    }
  },
  extraReducers: {
    //get Interview Rounds
    [getInterviewRounds.fulfilled]: (state, action) => {
      state.InterviewRounds = action.payload
    },
    // Create
    [createJob.fulfilled]: (state, action) => {
      state.HiringJobs.push(action.payload.finalResult)
      state.responseCode = action.payload.resCode
    },
    // Delete
    [deleteJob.fulfilled]: (state, action) => {
      state.HiringJobs = state.HiringJobs.filter(el => el.id !== action.payload)
    },
    [getHiringJobs.fulfilled]: (state, action) => {
      state.HiringJobs = action.payload
    },
    [getHiringJobs.rejected]: (state, action) => {
      toast.error('Connection Error.', {
        duration: 2000
      })
    },
    [getOneHiringJob.pending]: (state, action) => {
      state.loading = true
    },
    [getOneHiringJob.fulfilled]: (state, action) => {
      state.loading = false
      state.Job = action.payload
    },
    [getOneHiringJob.rejected]: (state, action) => {
      state.loading = true
      toast.error('Connection Error.', {
        duration: 2000
      })
    },
    [updateJob.fulfilled]: (state, action) => {
      state.HiringJobs = state.HiringJobs.map(el => (action.payload.id == el.id ? action.payload : el))
      state.responseCode = action.payload.resCode
    }
  }
})

export default HiringJobsSlice.reducer
