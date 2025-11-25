import { SupabaseModule } from '@/supabase/supabase.module';
import { Module } from '@nestjs/common';
import { API_KEY_REPOSITORY } from './domain/api-key.repository';
import { SupabaseApiKeyRepository } from './infrastructure/api-key.repository.impl';
import { ApiKeyService } from './application/api-key.service';
import { UtilsModule } from '@/shared/utils/utils.module';

@Module({
  imports: [SupabaseModule, UtilsModule],
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
