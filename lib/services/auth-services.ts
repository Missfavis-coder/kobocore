import { API_ROUTES, apiClient } from "../api ";
import {
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
  ForgotPasswordParams,
  ResetPasswordParams,
  ProfileResponse,
  SignOutResponse,
} from "../types/auth";

export const authService = {
  signUp: async (params: SignUpParams): Promise<SignUpResponse> => {
    const response = await apiClient.post<SignUpResponse>(
      API_ROUTES.auth.signup,
      params
    )
    if (response.data?.token) {
      localStorage.setItem("accessToken", response.data.token);
    }

    return response;
  },

  signIn: async (params: SignInParams): Promise<SignInResponse> => {
    const response = await apiClient.post<SignInResponse>(
      API_ROUTES.auth.signin,
      params
    );

    if (response.data?.token) {
      localStorage.setItem("accessToken", response.data.token);
    }

    return response;
  },

  signOut: async (): Promise<SignOutResponse> => {
    const response = await apiClient.post<SignOutResponse>(API_ROUTES.auth.signout);

    localStorage.removeItem("accessToken");

    return response;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    return apiClient.post<ProfileResponse>(API_ROUTES.auth.getProfile);
  },

  forgotPassword: async (
    params: ForgotPasswordParams
  ): Promise<{ message: string }> => {
    return apiClient.post(API_ROUTES.auth.forgotPassword, params);
  },

  resetPassword: async (
    params: ResetPasswordParams
  ): Promise<{ message: string }> => {
    return apiClient.post(API_ROUTES.auth.resetPassword, params);
  },
};
