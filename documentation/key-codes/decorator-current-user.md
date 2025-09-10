## 1️⃣ Crear un tipo para el Request autenticado

Crea un archivo, por ejemplo:

```ts
// src/auth/types/authenticated-request.type.ts
import { Request } from 'express';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface';

export interface AuthenticatedRequest extends Request {
  user: UserFromJwt; // ahora req.user será de tipo UserFromJwt
}
```

---

## 2️⃣ Tipar el decorador `@CurrentUser()`

Ahora ajustamos tu decorador para que use `AuthenticatedRequest` en lugar de `any`:

```ts
// src/auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface';
import { AuthenticatedRequest } from '../types/authenticated-request.type';

export const CurrentUser = createParamDecorator(
  (data: keyof UserFromJwt | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    return data ? user[data] : user;
  },
);
```

---

## 3️⃣ Uso en los controladores

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface';

@Controller('profile')
export class ProfileController {

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: UserFromJwt) {
    // `user` ya tiene la info completa que trajiste de la DB
    return {
      id: user.userId,
      email: user.email,
      roles: user.role,
      permissions: user.permissions,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('email')
  getEmail(@CurrentUser('email') email: string) {
    // Puedes acceder a un campo específico directamente
    return { email };
  }
}
```

---

### ✅ Ventajas

1. `req.user` ya tiene **tipado fuerte** (`UserFromJwt`).
2. No necesitas meter toda la info del usuario en el token.
3. Puedes acceder al usuario completo o solo a un campo con `@CurrentUser('field')`.
4. Mantienes el flujo de `JwtStrategy` limpio: token solo con lo necesario (`sub`) y la info completa se obtiene de la DB en cada request.
