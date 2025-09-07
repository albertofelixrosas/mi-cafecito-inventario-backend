export interface JwtPayload {
  sub: number; // ID del usuario
  email: string; // email del usuario
  exp: number; // fecha de expiración en formato timestamp
  iat: number; // fecha de emisión en formato timestamp
  aud?: string; // audiencia (opcional)
  roles?: string[]; // array de roles (opcional)
  name?: string; // Nombre completo (opcional)
  lastname?: string; // Apellido (opcional)
  sessionId: string; // Para trazabilidad de operaciones
  locationId: string; // ID de la sucursal/ubicación
}
