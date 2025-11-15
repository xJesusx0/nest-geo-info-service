import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/shared/types/database.types';

export const SUPABASE_CLIENT = 'supabaseClient';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SUPABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient<Database> => {
        return createClient<Database>(
          config.get<string>('SUPABASE_URL')!,
          config.get<string>('SUPABASE_ANON_KEY')!,
        );
      },
    },
  ],
  exports: ['supabaseClient'],
})
export class SupabaseModule {}
