export interface JwtPayload {
  sub: number; // ID del usuario
  refreshToken?: string; // Token de refresco opcional
}
