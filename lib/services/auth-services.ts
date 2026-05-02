import { API_ROUTES, apiClient } from "../api ";
import {
  RegisterParams,
  RegisterResponse,
  LoginParams,
  LoginResponse,
  RefreshParams,
  RefreshResponse,
  LogoutParams,
} from "../types/auth";

export const authService = {
  register: async (params: RegisterParams): Promise<RegisterResponse> => {
    const res = await apiClient.post<RegisterResponse>(
      API_ROUTES.auth.register,
      params
    );

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    return res;
  },

  login: async (params: LoginParams): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>(
      API_ROUTES.auth.login,
      params
    );

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    return res;
  },

  refresh: async (params: RefreshParams): Promise<RefreshResponse> => {
    const res = await apiClient.post<RefreshResponse>(
      API_ROUTES.auth.refresh,
      params
    );

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    return res;
  },

  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await apiClient.post(API_ROUTES.auth.logout, {
        refreshToken,
      } as LogoutParams);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};