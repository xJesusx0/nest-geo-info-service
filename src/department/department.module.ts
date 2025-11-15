import { Module } from '@nestjs/common';
import { DepartmentService } from './application/department.service';
import { DepartmentController } from './presentation/controllers/department.controller';
import { DEPARTMENT_REPOSITORY } from './domain/department.repository';
import { SupabaseModule } from '@/supabase/supabase.module';
import { SupabaseDepartmentRepository } from './infrastructure/department.repository.impl';

@Module({
  imports: [SupabaseModule],
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    {
      provide: DEPARTMENT_REPOSITORY,
      useClass: SupabaseDepartmentRepository,
    },
  ],
  exports: [DepartmentService],
})
export class DepartmentModule {}

