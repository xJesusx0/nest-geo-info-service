import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CountryService } from '../../application/country.service';
import { CountryDto, CountryQueryDto } from '../dto/country.dto';

@ApiTags('Countries')
@Controller('/api/v1/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @Scopes('country:read')
  @ApiOperation({
    summary: 'List all countries',
    description:
      'Retrieve a list of countries with optional filters (name, ISO codes)',
  })
  @ApiOkResponse({
    type: [CountryDto],
    description: 'List of countries',
  })
  async getAll(@Query() query: CountryQueryDto): Promise<CountryDto[]> {
    return this.countryService.getAllCountries(query);
  }

  @Get(':id')
  @Scopes('country:read')
  @ApiOperation({
    summary: 'Get country by ID',
    description: 'Retrieve detailed information about a specific country',
  })
  @ApiOkResponse({
    type: CountryDto,
    description: 'Country details',
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CountryDto> {
    const country = await this.countryService.getCountryById(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }
}
