import { Department } from '@/shared/types/department.types';
import { QueryDepartmentDto } from '../presentation/dto/department.dto';

export interface DepartmentRepository {
  findAll(queryParams: QueryDepartmentDto): Promise<Department[]>;
  findById(id: number): Promise<Department | null>;
}

export const DEPARTMENT_REPOSITORY = 'DepartmentRepository';
