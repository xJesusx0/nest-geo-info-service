import { Module } from '@nestjs/common';
import { SupabaseCountryRepository } from './infrastructure/country.repository.impl';
import { CountryService } from './application/country.service';
import { CountryController } from './presentation/controllers/country.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { COUNTRY_REPOSITORY } from './domain/country.repository';

@Module({
  providers: [
    {
      provide: COUNTRY_REPOSITORY,
      useClass: SupabaseCountryRepository,
    },
    CountryService,
  ],
  exports: [CountryService],
  controllers: [CountryController],
  imports: [SupabaseModule],
})
export class CountryModule {}
