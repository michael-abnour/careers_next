import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AxiosInstance from '../../utils/AxiosInstance'

// get interview rounds
// *get Jobs
export const getSkills = createAsyncThunk('Skills/getSkills', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get('recruit/skills/')
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.message
    })
  return data
})
export const getOneSkill = createAsyncThunk('Skills/getOneSkills', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let data
  const res = await AxiosInstance.get('recruit/Skills/')
    .then(res => {
      data = res.data.data
    })
    .catch(er => {
      data = er.response.message
    })
  return data
})
export const CreateSkill = createAsyncThunk('Skills/CreateSkill', async (jobData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  let resCode
  let finalResult
  const res = await AxiosInstance.post('recruit/Skills/', jobData)
    .then(res => {
      resCode = res.status
      console.log(res)
      finalResult = res.data.data
    })
    .catch(er => {
      resCode = er.response.status
    })
  return { finalResult, resCode }
})
// * Edit Job
export const updateSkill = createAsyncThunk('Skills/updateSkill', async ({ id, skill }, thunkAPI) => {
  let finalResult
  let resCode
  const { rejectWithValue } = thunkAPI
  const res = await AxiosInstance.put(`recruit/skills/${id}`, skill, {
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
  return { skill, resCode }
})

// * Delete Job
export const DeleteSkill = createAsyncThunk('Skills/DeleteSkill', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await AxiosInstance.delete(`Jobs/${id}`, {
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      roleId: JSON.parse(window.localStorage.getItem('userData')).roles[0].id
    }
  })
    .then(result => {
      Swal.fire({
        icon: 'success',
        title: 'Job Deleted Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch(er => {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Delete Job',
        showConfirmButton: false,
        timer: 1500
      })
    })

  return id
})

const SkillsSlice = createSlice({
  name: 'Jobs',
  initialState: {
    Skills: [],
    skill: {},
    loading: false
  },

  extraReducers: {
    //get All Skills
    [getSkills.pending]: (state, action) => {
      state.loading = true
    },
    [getSkills.fulfilled]: (state, action) => {
      state.loading = false
      state.Skills = action.payload
    },
    [getSkills.rejected]: (state, action) => {
      state.loading = false
      alert('Request Rejected')
    },
    //Create Skills
    [CreateSkill.pending]: (state, action) => {
      state.loading = true
    },
    [CreateSkill.fulfilled]: (state, action) => {
      state.loading = false
      state.Skills.push(action.payload.finalResult)
    },
    [CreateSkill.rejected]: (state, action) => {
      state.loading = false
      alert('Request Rejected')
    },
    //Update Skills
    [updateSkill.pending]: (state, action) => {
      state.loading = true
    },
    [updateSkill.fulfilled]: (state, action) => {
      state.Skills = state.Skills.map(el => (action.payload.id === el.id ? action.payload : el))
      state.responseCode = action.payload.resCode
    },
    [updateSkill.rejected]: (state, action) => {
      state.loading = false
      alert('Request Rejected')
    }
  }
})

// export const { setProjects } = projectsSlice.actions
export const { resetResCode } = SkillsSlice.actions
export default SkillsSlice.reducer
