import {configureStore} from '@reduxjs/toolkit'
import {apiServices} from '../services/apiServices';

const store = configureStore({
    reducer: {
        [apiServices.reducerPath]: apiServices.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiServices.middleware),
})

export default store