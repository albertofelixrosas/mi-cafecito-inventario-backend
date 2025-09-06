export interface JwtPayload {
  sub: number; // ID del usuario
  email: string; // email del usuario
  roles?: string[]; // array de roles (opcional)
}
