import { ApiKeyModule } from '@/api-key/api-key.module';
import { AuthGuard } from '@/shared/guards/auth.guard';
import { GuardModule } from '@/shared/guards/guards.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ApiKeyModule, GuardModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
