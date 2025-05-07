import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role?: string;
  } | null;
  subscriberModel: boolean;
  expandedMenu: string | null;
  activeMenuItem: string;
  menuTitle: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  subscriberModel: true,
  expandedMenu: "content-management",
  activeMenuItem: "dashboard",
  menuTitle: "Dashboard",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        token: string;
        role?: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.token = action.payload.token;
    },
    logout: (state:any) => {
      state.isAuthenticated = false;
      state.user = null;
      (state.expandedMenu = "content-management"),
        (state.activeMenuItem = "dashboard"),
        (state.menuTitle = "Dashboard");
      (state.user = ""), (state.token = "");
    },
    setSubscriberModel: (state, action: PayloadAction<boolean>) => {
      state.subscriberModel = action.payload;
    },
    setExpandedMenu: (state, action: PayloadAction<string | null>) => {
      state.expandedMenu = action.payload;
    },
    setActiveMenuItem: (state, action: PayloadAction<string>) => {
      state.activeMenuItem = action.payload;
    },
    setMenuTitle: (state, action: PayloadAction<string>) => {
      state.menuTitle = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setSubscriberModel,
  setExpandedMenu,
  setActiveMenuItem,
  setMenuTitle,
} = authSlice.actions;

export default authSlice.reducer;
