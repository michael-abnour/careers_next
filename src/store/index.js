// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import HiringJobsSlice from './HiringJobs'

export const store = configureStore({
  reducer: {
    HiringJobsSlice
    
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
