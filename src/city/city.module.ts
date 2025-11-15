import { SupabaseModule } from '@/supabase/supabase.module';
import { Module } from '@nestjs/common';
import { CITY_REPOSITORY } from './domain/city.repository';
import { SupabaseCityRepository } from './infrastructure/city.repository.impl';
import { CityService } from './application/city.service';
import { CityController } from './presentation/controllers/city.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [CityController],
  providers: [
    CityService,
    {
      provide: CITY_REPOSITORY,
      useClass: SupabaseCityRepository,
    },
  ],
  exports: [CityService],
})
export class CityModule {}
