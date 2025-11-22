import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CountryModule } from './country/country.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { CityModule } from './city/city.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CountryModule,
    DepartmentModule,
    SupabaseModule,
    CityModule,
    NeighborhoodModule,
    ApiKeyModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
