// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLES_KEY = 'roles';
// Kita pakai rest parameter (...roles) agar bisa menerima lebih dari satu role
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);