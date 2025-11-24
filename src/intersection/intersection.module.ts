import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { IntersectionService } from './application/intersection.service';
import { STREET_INTERSECTION_REPOSITORY } from './domain/intersection.repository';
import { StreetIntersectionRepositoryImpl } from './infrastructure/intersecton.repository.impl';

import { IntersectionController } from './presentation/controllers/intersection.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [IntersectionController],
  providers: [
    IntersectionService,
    {
      provide: STREET_INTERSECTION_REPOSITORY,
      useClass: StreetIntersectionRepositoryImpl,
    },
  ],
  exports: [IntersectionService],
})
export class IntersectionModule { }
