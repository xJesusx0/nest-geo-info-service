import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { AuthGuard } from './auth.guard';
import { ApiKeyModule } from '@/api-key/api-key.module';
import { PublicGuard } from './public.guard';
import { ScopesGuard } from './scopes.guard';

@Module({
  imports: [ApiKeyModule],
  providers: [ApiKeyGuard, AuthGuard, PublicGuard, ScopesGuard],
  exports: [ApiKeyGuard, AuthGuard, PublicGuard, ScopesGuard],
})
export class GuardModule {}
