import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { NeighborhoodService } from '../../application/neighborhood.service';
import { QueryNeighborhoodDto, NeighborhoodDto } from '../dto/neighborhood.dto';

@ApiTags('Neighborhoods')
@ApiSecurity('api-key')
@Controller('/api/v1/neighborhoods')
export class NeighborhoodController {
  constructor(private readonly neighborhoodService: NeighborhoodService) {}

  @Get('point')
  @Scopes('neighborhood:read')
  @ApiOperation({
    summary: 'Get neighborhood by geographic coordinates',
    description:
      'Find the neighborhood at a specific geographic point (latitude, longitude)',
  })
  @ApiOkResponse({
    type: NeighborhoodDto,
    description: 'Neighborhood at the given coordinates',
  })
  @ApiNotFoundResponse({
    description: 'No neighborhood found at the given coordinates',
  })
  async getByPoint(
    @Query() query: QueryNeighborhoodDto,
  ): Promise<NeighborhoodDto> {
    const { longitude, latitude } = query;
    const neighborhood = await this.neighborhoodService.findByCoordinates(
      longitude,
      latitude,
    );

    if (!neighborhood) {
      throw new NotFoundException(
        `Neighborhood not found for coordinates: lon=${longitude}, lat=${latitude}`,
      );
    }

    return neighborhood;
  }
}
