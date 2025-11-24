import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import { IntersectionService } from '../../application/intersection.service';
import {
  CreateIntersectionDto,
  IntersectionQueryDto,
  IntersectionResponseDto,
  StreetIntersectionByPointDto,
} from '../dto/intersection.dto';

@ApiTags('Intersections')
@Controller('/api/v1/intersections')
export class IntersectionController {
  constructor(private readonly intersectionService: IntersectionService) {}

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

  @Post()
  @Scopes('street_intersection:write')
  @ApiOperation({
    summary: 'Create a street intersection',
    description:
      'Creates an intersection between two streets if they geometrically intersect. Returns the created intersection or an error if the streets do not cross.',
  })
  @ApiCreatedResponse({
    type: IntersectionResponseDto,
    description: 'Intersection successfully created',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request: streets do not intersect, same street IDs, or invalid parameters',
  })
  async createIntersection(
    @Body() createDto: CreateIntersectionDto,
  ): Promise<IntersectionResponseDto> {
    return this.intersectionService.createIntersection(createDto);
  }
}
