import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AxiosInstance from '../../utils/AxiosInstance'

// get interview rounds
// *get Jobs
// export const getInterviewRounds = createAsyncThunk('jobApplications/getInterviewRounds', async (_, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI
//   let data
//   const res = await AxiosInstance.get('recruit/interviewRounds/')
//     .then(res => {
//       data = res.data.data
//     })
//     .catch(er => {
//       data = er.response.message
//     })
//   return data
// })
export const getJobApplications = createAsyncThunk('jobApplications/getJobApplications', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get('recruit/jobApplications/')
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.message
    })
  return data
})

export const getJobAppsStatuses = createAsyncThunk('jobApplications/getJobAppsStatuses', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get('recruit/applicationStatuses/')
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.message
    })
  return data
})

export const getGroupedApplicationsByStatus = createAsyncThunk(
  'jobApplications/getGroupedApplicationsByStatus',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    let data
    const res = await AxiosInstance.get('recruit/jobApplications/groupedByStatus')
      .then(res => {
        data = res.data.data
      })
      .catch(er => {
        data = er.response.message
      })
    return data
  }
)

export const getJobApplication = createAsyncThunk('jobApplications/getJobApplication', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get(`recruit/jobApplications/${id}`)
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.status
    })
  return data
})

export const createJobApplication = createAsyncThunk(
  'jobApplications/createJobApplication',
  async (jobApplicationData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    let resCode
    let finalResult
    const res = await AxiosInstance.post('recruit/jobApplications/', jobApplicationData)
      .then(res => {
        resCode = res.status
        finalResult = res.data.data
      })
      .catch(er => {
        resCode = er.response.status
      })
    return { finalResult, resCode }
  }
)
// * Edit Job
export const updateJobApplication = createAsyncThunk(
  'jobApplications/updateJobApplication',
  async ({ data, id }, thunkAPI) => {
    let finalResult
    let resCode
    const { rejectWithValue } = thunkAPI
    console.log(data)
    const res = await AxiosInstance.put(`recruit/jobApplications/${id}`, data, {
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
  }
)

export const updateStatus = createAsyncThunk(
  'jobApplications/updateStatus',
  async ({ jobAppId, statusId }, thunkAPI) => {
    let finalResult
    let resCode
    const { rejectWithValue } = thunkAPI
    const res = await AxiosInstance.put(
      `recruit/jobApplications/${jobAppId}/status/${statusId}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
          roleId: JSON.parse(window.localStorage.getItem('userData')).roles[0].id
        }
      }
    )
      .then(res => {
        resCode = res.status
        toast.success('Job Status Updated Successfully.', {
          duration: 2000
        })
      })
      .catch(er => {
        resCode = er.response.status
        toast.error('Ops! An Error Occurred! Please Contact System Support.', {
          duration: 4000
        })
      })
    console.log(resCode)
    return resCode
  }
)

export const archiveApplication = createAsyncThunk('jobApplications/archive', async (jobAppId, thunkAPI) => {
  let finalResult
  let resCode
  const { rejectWithValue } = thunkAPI
  console.log('Hello from redux')
  const res = await AxiosInstance.put(
    `recruit/jobApplications/${jobAppId}/archive`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        roleId: JSON.parse(window.localStorage.getItem('userData')).roles[0].id
      }
    }
  )
    .then(res => {
      resCode = res.status
    })
    .catch(er => {
      resCode = er.response.status
    })
  return { jobAppId, resCode }
})

// * Delete Job
export const deleteJobApplication = createAsyncThunk('jobApplications/deleteJobApplication', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await AxiosInstance.delete(`recruit/jobApplications/${id}`, {
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

const JobApplications = createSlice({
  name: 'jobApplications',
  initialState: {
    jobApplications: [],
    groupedJobApps: [],
    appStatuses: [],
    jobApplication: {},
    loading: false,
    responseCode: 0
  },
  reducers: {
    resetResCode: state => {
      state.responseCode = 0
    }
  },
  extraReducers: {
    // Create
    [createJobApplication.fulfilled]: (state, action) => {
      state.jobApplications.push(action.payload.finalResult)
      state.responseCode = action.payload.resCode
    },
    // Delete
    [deleteJobApplication.fulfilled]: (state, action) => {
      state.jobApplications = state.jobApplications.filter(el => el.id !== action.payload)
    },
    // Get Job Applications Status List
    [getJobAppsStatuses.fulfilled]: (state, action) => {
      state.appStatuses = action.payload
    },
    //Get Job Applications Grouped By Status (For Board View)
    [getGroupedApplicationsByStatus.pending]: (state, action) => {
      state.loading = true
    },
    [getGroupedApplicationsByStatus.fulfilled]: (state, action) => {
      state.loading = false
      state.groupedJobApps = action.payload
    },
    [getGroupedApplicationsByStatus.rejected]: (state, action) => {
      toast.error('Connection Error.', {
        duration: 2000
      })
    },

    //Get Job Applications
    [getJobApplications.pending]: (state, action) => {
      state.loading = true
    },
    [getJobApplications.fulfilled]: (state, action) => {
      state.loading = false
      state.jobApplications = action.payload
    },
    [getJobApplications.rejected]: (state, action) => {
      toast.error('Connection Error.', {
        duration: 2000
      })
    },

    // Get One Job Application
    [getJobApplication.pending]: (state, action) => {
      state.loading = true
    },
    [getJobApplication.fulfilled]: (state, action) => {
      state.loading = false
      state.jobApplication = action.payload
    },
    [getJobApplication.rejected]: (state, action) => {
      state.loading = true
      toast.error('Connection Error.', {
        duration: 2000
      })
    },
    [updateJobApplication.fulfilled]: (state, action) => {
      state.jobApplications = state.jobApplications.map(el => (action.payload.id == el.id ? action.payload : el))
      state.responseCode = action.payload.resCode
    },
    [updateStatus.fulfilled]: (state, action) => {
      state.responseCode = action.payload
    }
  }
})

// export const { setProjects } = projectsSlice.actions
export const { resetResCode } = JobApplications.actions
export default JobApplications.reducer
