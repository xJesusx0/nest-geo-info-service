import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NeighborhoodService } from '../../application/neighborhood.service';
import { QueryNeighborhoodDto } from '../dto/neighborhood.dto';
import { NeighborhoodByPoint } from '@/shared/types/neighborhood.types';

@ApiTags('Neighborhoods')
@Controller('/api/v1/neighborhoods')
export class NeighborhoodController {
  constructor(private readonly neighborhoodService: NeighborhoodService) {}

  @Get('point')
  async getByPoint(
    @Query() query: QueryNeighborhoodDto,
  ): Promise<NeighborhoodByPoint> {
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
