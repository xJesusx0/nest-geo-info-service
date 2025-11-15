import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from '../../application/country.service';
import { Country } from '@/shared/types/country.types';
import { CountryQueryDto } from '../dto/country.dto';

@ApiTags('Countries')
@Controller('/api/v1/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAll(@Query() query: CountryQueryDto): Promise<Country[]> {
    return this.countryService.getAllCountries(query);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Country> {
    const country = await this.countryService.getCountryById(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }
}
