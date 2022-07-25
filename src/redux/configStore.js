import { configureStore } from '@reduxjs/toolkit'
import { CarouselReducer } from './reducers/CarouselReducer'
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer'
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer'
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer'
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer'
import { LoadingReducer } from './reducers/LoadingReducer'

export const store = configureStore({
    reducer: {
        CarouselReducer,
        QuanLyPhimReducer,
        QuanLyRapReducer,
        QuanLyNguoiDungReducer,
        QuanLyDatVeReducer,
        LoadingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

