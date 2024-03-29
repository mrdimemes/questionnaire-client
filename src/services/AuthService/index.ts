import api from "src/api";
import { wrapFetchError } from "src/api/utils";
import store from "src/redux";
import { setUser, clearUser } from "src/redux/slices/authSlice";

import type { LoginResponse } from "src/types";


class AuthService {
  private static setAuth(authData: LoginResponse) {
    localStorage.setItem("accessToken", authData.accessToken);
    localStorage.setItem("refreshToken", authData.refreshToken);
    store.dispatch(setUser(authData.user));
  };

  private static clearAuth() {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    store.dispatch(clearUser());
  };

  static async registration(email: string, name: string, password: string) {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/registration",
        { email, name, password },
      );
      this.setAuth(response.data);
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async login(email: string, password: string) {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        { email, password },
      );
      this.setAuth(response.data);
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    api.post<void>("/auth/logout", { refreshToken });
    this.clearAuth();
  };
};

export default AuthService;