import { Module } from '@nestjs/common';
import { TrafficLightController } from './presentation/controllers/traffic-light.controller';
import { TrafficLightService } from './application/traffic-light.service';
import { SupabaseModule } from '@/supabase/supabase.module';
import { TrafficLightRepositoryImpl } from './infrastructure/traffic-light.repository.impl';
import { TRAFFIC_LIGHT_REPOSITORY } from './domain/traffic-light.repository';

@Module({
  imports: [SupabaseModule],
  providers: [
    TrafficLightService,
    {
      provide: TRAFFIC_LIGHT_REPOSITORY,
      useClass: TrafficLightRepositoryImpl,
    },
  ],
  exports: [TrafficLightService],
  controllers: [TrafficLightController],
})
export class TrafficLightModule {}
