import { ApiKeyModule } from '@/api-key/api-key.module';
import { ApiKeyGuard } from '@/shared/guards/api-key.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ApiKeyModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AuthModule {}
