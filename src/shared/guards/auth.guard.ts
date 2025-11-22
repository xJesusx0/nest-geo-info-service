import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly apiKeyGuard: ApiKeyGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.apiKeyGuard.canActivate(context);
  }
}
