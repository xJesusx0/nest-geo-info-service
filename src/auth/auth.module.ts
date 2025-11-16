import { ApiKeyModule } from '@/api-key/api-key.module';
import { ApiKeyService } from '@/api-key/application/api-key.service';
import { API_KEY_GUARD, ApiKeyGuard } from '@/shared/guards/api-key.guard';
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
