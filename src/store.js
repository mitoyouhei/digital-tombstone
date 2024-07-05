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

const initUser = localStorage.getItem("user");
const userSlice = createSlice({
  name: "user",
  initialState: initUser ? JSON.parse(initUser) : {},
  reducers: {
    setUser: (state, action) => {
      const user = { ...state, ...action.payload.value };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    logout: (state, action) => {
      localStorage.removeItem("user");
      window.location.reload();
      return {};
    },
  },
});

export const { setGenes } = soulGeneSlice.actions;
export const { setUser, logout } = userSlice.actions;




const store = configureStore({
  reducer: {
    soulGene: soulGeneSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
