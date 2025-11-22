import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { AuthGuard } from './auth.guard';
import { ApiKeyModule } from '@/api-key/api-key.module';

@Module({
  imports: [ApiKeyModule],
  providers: [ApiKeyGuard, AuthGuard],
  exports: [ApiKeyGuard, AuthGuard],
})
export class GuardModule {}
