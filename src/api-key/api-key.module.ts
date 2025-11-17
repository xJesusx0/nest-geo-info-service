import { SupabaseModule } from '@/supabase/supabase.module';
import { Module } from '@nestjs/common';
import { API_KEY_REPOSITORY } from './domain/api-key.repository';
import { SupabaseApiKeyRepository } from './infrastructure/api-key.repository.impl';
import { ApiKeyService } from './application/api-key.service';

@Module({
  imports: [SupabaseModule],
  providers: [
    ApiKeyService,
    {
      provide: API_KEY_REPOSITORY,
      useClass: SupabaseApiKeyRepository,
    },
  ],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
