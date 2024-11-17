import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    // Get roles from metadata
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!roles) {
      return true; // If no roles are set, allow access
    }

    if (!user || !roles.includes(user.role)) {
      return false;
    }

    return true;
  }
}


export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
