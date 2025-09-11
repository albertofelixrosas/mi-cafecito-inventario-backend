// src/auth/decorators/require-permission.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'requiredPermission';

/**
 * Decorador para proteger un endpoint con un permiso específico.
 * Ejemplo: @RequirePermission('product-categories:create')
 */
export const RequirePermission = (permission: string) =>
  SetMetadata(PERMISSION_KEY, permission);
