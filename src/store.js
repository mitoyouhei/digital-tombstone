import { configureStore, createSlice } from "@reduxjs/toolkit";

const soulGeneSlice = createSlice({
  name: "soulGene",
  initialState: {},
  reducers: {
    setGenes: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => ({ ...state, ...action.payload.value }),
  },
});

export const { setGenes } = soulGeneSlice.actions;
export const { setUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    soulGene: soulGeneSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
