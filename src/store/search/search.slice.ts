import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
   searchValue: string | null
}

const initialState: SearchState = {
   searchValue: null
}

const searchSlice = createSlice({
   name: 'search',
   initialState: initialState,
   reducers: {
      searchUpdate(state, action: PayloadAction<string>) {
         return ({
            ...state,
            searchValue: action.payload
         })
      },
      clearSearch(state, action: PayloadAction<void>) {
         return ({
            ...state,
            searchValue: null
         })
      }
   }
})

export default searchSlice.reducer;
export const {clearSearch, searchUpdate} = searchSlice.actions;