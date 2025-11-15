import { CityService } from '@/city/application/city.service';
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
import { QueryCityDto, CityWithRelationsDto, CityDto } from '../dto/city.dto';

@ApiTags('Cities')
@Controller('/api/v1/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOperation({
    summary: 'List all cities',
    description:
      'Retrieve a list of cities with optional filters (country, department, name, DANE code)',
  })
  @ApiOkResponse({
    type: [CityWithRelationsDto],
    description: 'List of cities with relations',
  })
  async getAll(
    @Query() queryParams: QueryCityDto,
  ): Promise<CityWithRelationsDto[]> {
    return this.cityService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get city by ID',
    description: 'Retrieve detailed information about a specific city',
  })
  @ApiOkResponse({
    type: CityDto,
    description: 'City details',
  })
  @ApiNotFoundResponse({
    description: 'City not found',
  })
  async getById(@Param('id') id: string): Promise<CityDto> {
    const city = await this.cityService.findOne(+id);
    if (!city) {
      throw new NotFoundException(`City with id ${id} not found`);
    }
    return city;
  }
}
