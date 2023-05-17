// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import HiringJobsSlice from './HiringJobs'
import Skills from './Skills'
import JobApplications from './JobApplications'

export const store = configureStore({
  reducer: {
    HiringJobsSlice,
    Skills,
    JobApplications
    
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
