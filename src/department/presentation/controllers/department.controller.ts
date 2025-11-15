import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { DepartmentService } from '@/department/application/department.service';
import { QueryDepartmentDto } from '@/department/presentation/dto/department.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@Controller('/api/v1/departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(@Query() queryParams: QueryDepartmentDto) {
    return this.departmentService.findAll(queryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const department = await this.departmentService.findOne(+id);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    return department;
  }
}
