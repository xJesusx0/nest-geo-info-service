import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { NeighborhoodController } from './presentation/controllers/neighborhood.controller';
import { NeighborhoodService } from './application/neighborhood.service';
import { NEIGHBORHOOD_REPOSITORY } from './domain/neighborhood.repository';
import { SupabaseNeighborhoodRepository } from './infrastructure/neighborhood.repository.impl';

@Module({
  imports: [SupabaseModule],
  controllers: [NeighborhoodController],
  providers: [
    NeighborhoodService,
    {
      provide: NEIGHBORHOOD_REPOSITORY,
      useClass: SupabaseNeighborhoodRepository,
    },
  ],
  exports: [NeighborhoodService],
})
export class NeighborhoodModule {}
