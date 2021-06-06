import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: 'counter',
    initialState: {
        totalCredit: 0,
        totalDebit: 0,
        PresentBalanceData: { Data: [], min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER, offSet: 0, categories: [] },
        CreditDebitData: { CreditData: [], DebitData: [], min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER, offSet: 0 }
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
        //Function for taking the transaction Data
        setBankData: (state, action) => {
            // console.log("setBankData Result :", action.payload);
            var data = action.payload;
            var temp = 0.0;
            state.PresentBalanceData.Data = [];
            state.PresentBalanceData.categories = [];
            data.map(x => {
                // Total Amount Computation 
                if (state.PresentBalanceData.min > x[7]) state.PresentBalanceData.min = x[7];
                if (state.PresentBalanceData.max < x[7]) state.PresentBalanceData.max = x[7];
                state.PresentBalanceData.Data = [...state.PresentBalanceData.Data, x[7]];
                state.PresentBalanceData.categories = [...state.PresentBalanceData.categories, x[1]];
                // Credit and Debit Amount Computation 
                state.CreditDebitData.DebitData = [...state.CreditDebitData.DebitData, x[5]];
                state.CreditDebitData.CreditData = [...state.CreditDebitData.CreditData, x[6]];
                temp = x[5] < x[6] ? x[5] : x[6];
                if (state.CreditDebitData.min > temp) state.CreditDebitData.min = temp;
                temp = x[5] > x[6] ? x[5] : x[6];
                if (state.CreditDebitData.max < temp) state.CreditDebitData.max = temp;
            });
            state.PresentBalanceData.offSet = (state.PresentBalanceData.max - state.PresentBalanceData.min) / 10;
            state.CreditDebitData.offSet = (state.CreditDebitData.max - state.CreditDebitData.min) / 10;
            // console.log('PresentBalance State :', state.PresentBalanceData.Data, state.PresentBalanceData.min, state.PresentBalanceData.max, state.PresentBalanceData.categories);
            console.log('PresentBalance State :', state.CreditDebitData.DebitData, state.CreditDebitData.CreditData, state.CreditDebitData.min, state.CreditDebitData.max, state.CreditDebitData.offSet);
        },
        // Functions For taking Care of Line Gra
    },
});

// Action creators are generated for each case reducer function
export const { setCreditDebitValue, setBankData } = transactionSlice.actions

export default transactionSlice.reducer