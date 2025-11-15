import { Inject, Injectable } from '@nestjs/common';
import type { DepartmentRepository } from '../domain/department.repository';
import { DEPARTMENT_REPOSITORY } from '../domain/department.repository';
import { DepartmentSearchQueryParams } from '@/shared/types/department.types';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DEPARTMENT_REPOSITORY)
    private departmentRepository: DepartmentRepository,
  ) {}

  findAll(queryParams: DepartmentSearchQueryParams) {
    return this.departmentRepository.findAll(queryParams);
  }

  findOne(id: number) {
    return this.departmentRepository.findById(id);
  }
}
