import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import { ApiKeyGuard } from '@/shared/guards/api-key.guard';
import { ScopesGuard } from '@/shared/guards/scopes.guard';
import { IntersectionService } from '../../application/intersection.service';
import {
  IntersectionQueryDto,
  StreetIntersectionByPointDto,
} from '../dto/intersection.dto';

@ApiTags('Intersections')
@Controller('/api/v1/intersections')
export class IntersectionController {
  constructor(private readonly intersectionService: IntersectionService) { }

  @Get()
  @Scopes('street_intersection:read')
  @ApiOperation({
    summary: 'Get intersections by point',
    description:
      'Retrieve intersections within a radius of a specific point (lat, lng)',
  })
  @ApiOkResponse({
    type: [StreetIntersectionByPointDto],
    description: 'List of intersections found',
  })
  async getByPoint(
    @Query() query: IntersectionQueryDto,
  ): Promise<StreetIntersectionByPointDto[]> {
    return this.intersectionService.getByPoint(query);
  }
}
