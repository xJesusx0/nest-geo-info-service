import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { AuthGuard } from './auth.guard';
import { ApiKeyModule } from '@/api-key/api-key.module';
import { PublicGuard } from './public.guard';

@Module({
  imports: [ApiKeyModule],
  providers: [ApiKeyGuard, AuthGuard, PublicGuard],
  exports: [ApiKeyGuard, AuthGuard, PublicGuard],
})
export class GuardModule {}
