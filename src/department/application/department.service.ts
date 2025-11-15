import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { DepartmentRepository } from '../domain/department.repository';
import { DEPARTMENT_REPOSITORY } from '../domain/department.repository';
import { DepartmentSearchQueryParams } from '@/shared/types/department.types';
import { DepartmentDto } from '../presentation/dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DEPARTMENT_REPOSITORY)
    private departmentRepository: DepartmentRepository,
  ) {}

  async findAll(
    queryParams: DepartmentSearchQueryParams,
  ): Promise<DepartmentDto[]> {
    const departments = await this.departmentRepository.findAll(queryParams);
    return plainToInstance(DepartmentDto, departments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<DepartmentDto | null> {
    const department = await this.departmentRepository.findById(id);
    if (!department) {
      return null;
    }
    return plainToInstance(DepartmentDto, department, {
      excludeExtraneousValues: true,
    });
  }
}
