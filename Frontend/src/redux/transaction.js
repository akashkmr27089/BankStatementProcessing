import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: 'counter',
    initialState: {
        totalCredit: 0,
        totalDebit: 0,
    },
    reducers: {
        setCreditDebitValue: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log("Action setCreditDebitValue Testing ", action.payload)
            var temp = JSON.parse(action.payload);
            state.totalCredit = temp["totalCredit"];
            state.totalDebit = temp["totalDebit"];
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCreditDebitValue } = transactionSlice.actions

export default transactionSlice.reducer