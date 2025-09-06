import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from './types/auth.user';

export const GetUser = createParamDecorator(
  (data: keyof AuthUser | null, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    if (!data) return req.user;
    return req.user?.[data];
  },
);
