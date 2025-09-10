// src/auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../types/auth-request.type';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof UserFromJwt | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    // Si pasas la propiedad: @CurrentUser('sub') → devuelve el ID
    // Si no pasas nada: @CurrentUser() → devuelve todo el objeto
    return data ? user?.[data] : user;
  },
);
