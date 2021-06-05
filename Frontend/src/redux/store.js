import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter';
import transactionReducer from './transaction';


export default configureStore({
    reducer: {
        counter: counterReducer,
        transaction: transactionReducer,
    },
})
