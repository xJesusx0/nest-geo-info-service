import { Inject, Injectable } from '@nestjs/common';
import { toDto } from '@/shared/utils/dto-transformer';
import type { DepartmentRepository } from '../domain/department.repository';
import { DEPARTMENT_REPOSITORY } from '../domain/department.repository';
import { DepartmentSearchQueryParams } from '@/shared/types/department.types';
import { DepartmentDto } from '../presentation/dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DEPARTMENT_REPOSITORY)
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async getAllDepartments(
    query: DepartmentSearchQueryParams,
  ): Promise<DepartmentDto[]> {
    const departments = await this.departmentRepository.findAll(query);
    return toDto(DepartmentDto, departments);
  }

  async getDepartmentById(id: number): Promise<DepartmentDto | null> {
    const department = await this.departmentRepository.findById(id);
    if (!department) {
      return null;
    }
    return toDto(DepartmentDto, department);
  }
}
