import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: 'counter',
    initialState: {
        totalCredit: 0,
        totalDebit: 0,
        PresentBalance: []
    },
    reducers: {
        //Function for Taking care of Total Credit and Debit 
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
        // Functions For taking Care of Line Graph
        appendPresentBalance: (state, action) => {
            console.log("Action appendPresentBalance Testing", action.payload)
            state.PresentBalance = [...state.PresentBalance, action.payload];
        },
        emptyPresentBalance: (state) => {
            state.PresentBalance = [];
            console.log("Action appendPresentBalance Testing", state.PresentBalance)
        }
    },
});

// Action creators are generated for each case reducer function
export const { setCreditDebitValue, appendPresentBalance, emptyPresentBalance } = transactionSlice.actions

export default transactionSlice.reducer