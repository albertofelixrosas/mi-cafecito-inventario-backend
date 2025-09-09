export interface UserFromJwt {
  userId: number;
  email?: string;
  phone?: string;
  name: string;
  lastname: string;
  role: string;
  permissions: string[];
}
