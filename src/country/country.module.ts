import { Module } from '@nestjs/common';
import { SupabaseCountryRepository } from './infrastructure/country.repository.impl';
import { CountryService } from './application/country.service';
import { CountryController } from './presentation/controllers/country.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  providers: [
    {
      provide: 'CountryRepository',
      useClass: SupabaseCountryRepository,
    },
    CountryService,
  ],
  exports: [CountryService],
  controllers: [CountryController],
  imports: [SupabaseModule],
})
export class CountryModule {}
