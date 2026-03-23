import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import { IntersectionService } from '../../application/intersection.service';
import {
  CreateIntersectionDto,
  IntersectionQueryDto,
  IntersectionResponseDto,
  StreetIntersectionByPointDto,
  StreetIntersectionWithStreetsDto,
} from '../dto/intersection.dto';
import { StreetIntersectionWithStreets } from '@/shared/types/intersection.types';

@ApiTags('Intersections')
@ApiSecurity('api-key')
@Controller('/api/v1/intersections')
export class IntersectionController {
  constructor(private readonly intersectionService: IntersectionService) {}

  @Get()
  @Scopes('street_intersection:read')
  @ApiOperation({
    summary: 'Get all intersections',
    description: 'Retrieve a list of all street intersections',
  })
  @ApiOkResponse({
    type: [StreetIntersectionWithStreetsDto],
    description: 'List of all intersections',
  })
  async getAll(): Promise<StreetIntersectionWithStreets[]> {
    return this.intersectionService.getAll();
  }

  @Get('/coordinates')
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
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  async getByPoint(
    @Query() query: IntersectionQueryDto,
  ): Promise<StreetIntersectionByPointDto[]> {
    return this.intersectionService.getByPoint(query);
  }

  @Get(':id')
  @Scopes('street_intersection:read')
  @ApiOperation({
    summary: 'Get intersection by ID',
    description: 'Retrieve a specific intersection by its unique identifier',
  })
  @ApiOkResponse({
    type: IntersectionResponseDto,
    description: 'Intersection found',
  })
  @ApiNotFoundResponse({
    description: 'Intersection not found',
  })
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IntersectionResponseDto> {
    return this.intersectionService.getById(id);
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
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createIntersection(
    @Body() createDto: CreateIntersectionDto,
  ): Promise<IntersectionResponseDto> {
    return this.intersectionService.createIntersection(createDto);
  }
}
