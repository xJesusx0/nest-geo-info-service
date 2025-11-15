import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { DepartmentService } from '@/department/application/department.service';
import {
  DepartmentDto,
  QueryDepartmentDto,
} from '@/department/presentation/dto/department.dto';

@ApiTags('Departments')
@Controller('/api/v1/departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  @ApiOperation({
    summary: 'List all departments',
    description:
      'Retrieve a list of departments with optional filters (name, DANE code, country)',
  })
  @ApiOkResponse({
    type: [DepartmentDto],
    description: 'List of departments',
  })
  async findAll(
    @Query() queryParams: QueryDepartmentDto,
  ): Promise<DepartmentDto[]> {
    return this.departmentService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get department by ID',
    description: 'Retrieve detailed information about a specific department',
  })
  @ApiOkResponse({
    type: DepartmentDto,
    description: 'Department details',
  })
  @ApiNotFoundResponse({
    description: 'Department not found',
  })
  async findOne(@Param('id') id: string): Promise<DepartmentDto> {
    const department = await this.departmentService.findOne(+id);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    return department;
  }
}
