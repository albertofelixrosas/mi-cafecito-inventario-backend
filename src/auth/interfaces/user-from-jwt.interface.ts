export interface UserFromJwt {
  // Identificación básica
  userId: number; // ID del usuario (desde payload.sub)
  email: string; // email del usuario

  // Roles y permisos
  roles: string[]; // ['admin', 'cocinero', 'inventario']
  permissions?: string[]; // Permisos específicos si los usas

  // Datos CRÍTICOS para auditoría de inventario
  sessionId: string; // Para trazabilidad de operaciones
  locationId: string; // ID de la sucursal/ubicación

  // Datos adicionales útiles
  name?: string; // Nombre completo si lo necesitas
  lastname: string; // Apellido si lo necesitas
}
