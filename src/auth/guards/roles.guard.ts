// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);    

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (!user || !user.role) {
      throw new HttpException('Anda tidak memiliki hak akses (Unauthorized)', HttpStatus.UNAUTHORIZED);
    }

    const hasRole = requiredRoles.includes(user.role);
    
    if (!hasRole) {
      throw new HttpException('Akses ditolak! Akun Anda tidak memiliki izin.', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}