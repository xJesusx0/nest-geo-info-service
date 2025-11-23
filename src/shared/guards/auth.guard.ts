import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { PublicGuard } from './public.guard';
import { ScopesGuard } from './scopes.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly publicGuard: PublicGuard,
    private readonly scopesGuard: ScopesGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.publicGuard.canActivate(context)) return true;

    const apiKeyValid = await this.apiKeyGuard.canActivate(context);
    if (!apiKeyValid) {
      return false;
    }

    const scopesValid = this.scopesGuard.canActivate(context);
    return scopesValid;
  }
}
