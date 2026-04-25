// types/auth.ts

export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    // password is never returned
  }
  
  export interface SignUpParams {
    name: string;
    email: string;
    password: string;
  }
  
  export interface SignUpResponse {
    success: boolean;
    message: string;
    data: {
      token: string;
      user: User;
    };
  }
  
  export interface SignInParams {
    email: string;
    password: string;
  }
  
  export interface SignInResponse {
    success: boolean;
    message: string;
    data: {
      token: string;
      user: User;
    };
  }
  
  export interface SignOutResponse {
    message: string;
  }
  
  export interface ProfileResponse {
    user: User;
  }
  
  export interface ForgotPasswordParams {
    email: string;
  }
  
  export interface ResetPasswordParams {
    token: string;
    newPassword: string;
  }
  