import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const soulGeneSlice = createSlice({
  name: "soulGene",
  initialState,
  reducers: {
    setGenes: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setGenes } = soulGeneSlice.actions;

const store = configureStore({
  reducer: {
    soulGene: soulGeneSlice.reducer,
  },
});

export default store;
