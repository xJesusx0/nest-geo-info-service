import { CityService } from '@/city/application/city.service';
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryCityDto } from '../dto/city.dto';
import { City, CityWithRelations } from '@/shared/types/city.types';

@ApiTags('Cities')
@Controller('/api/v1/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAll(
    @Query() queryParams: QueryCityDto,
  ): Promise<CityWithRelations[]> {
    return this.cityService.findAll(queryParams);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<City> {
    const city = await this.cityService.findOne(+id);
    if (!city) {
      throw new NotFoundException(`City with id ${id} not found`);
    }
    return city;
  }
}
