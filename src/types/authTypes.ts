export interface LoginCredentials {
  email: string;
  password: string;
}

// export interface AuthResponse {
//   token: string;
//   adminName: string;
// }


export interface AuthResponse {
  name: string;
  email: string;
  token: string;
}
