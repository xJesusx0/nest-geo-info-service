import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SCOPES_KEY } from '../decorators/scopes.decorator';

import { AuthenticatedRequest } from '../types/api-key.types';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const endpointScopes = this.reflector.getAllAndOverride<string[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!endpointScopes || endpointScopes.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userScopes: string[] = request.scopes || [];

    if (userScopes.includes('*')) {
      return true;
    }

    const hasScope = endpointScopes.some((scope) => {
      if (userScopes.includes(scope)) {
        return true;
      }

      // Check for resource wildcard (e.g. "countries:*")
      const [resource] = scope.split(':');
      if (resource && userScopes.includes(`${resource}:*`)) {
        return true;
      }

      return false;
    });

    return hasScope;
  }
}
