import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { PublicGuard } from './public.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly publicGuard: PublicGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      (await this.publicGuard.canActivate(context)) ||
      (await this.apiKeyGuard.canActivate(context))
    );
  }
}
