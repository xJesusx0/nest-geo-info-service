import { Inject, Injectable } from '@nestjs/common';
import type { DepartmentRepository } from '../domain/department.repository';
import { DEPARTMENT_REPOSITORY } from '../domain/department.repository';
import type { QueryDepartmentDto } from '../presentation/dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DEPARTMENT_REPOSITORY)
    private departmentRepository: DepartmentRepository,
  ) {}

  findAll(queryParams: QueryDepartmentDto) {
    return this.departmentRepository.findAll(queryParams);
  }

  findOne(id: number) {
    return this.departmentRepository.findById(id);
  }
}
