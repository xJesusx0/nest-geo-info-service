import { ApiKey } from '@/shared/types/api-key.types';
import { ApiKeyRepository } from '../domain/api-key.repository';
import { Inject } from '@nestjs/common';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/database.types';

export class SupabaseApiKeyRepository implements ApiKeyRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient<Database>,
  ) {}

  async findByKey(hashedKey: string): Promise<ApiKey | null> {
    const query = this.supabaseClient
      .from('api_key')
      .select('*')
      .eq('key_hash', hashedKey)
      .single();

    const { data, error } = await query;

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error(error);
      throw new Error(error.message);
    }

    return data;
  }
}
