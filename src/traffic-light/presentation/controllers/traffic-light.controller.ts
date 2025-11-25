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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import { TrafficLightService } from '../../application/traffic-light.service';
import {
  CreateTrafficLightDto,
  CreateTrafficLightResponseDto,
  TrafficLightDto,
  TrafficLightSearchDto,
} from '../dto/traffic-light.dto';

@ApiTags('Traffic Lights')
@Controller('/api/v1/traffic-lights')
export class TrafficLightController {
  constructor(private readonly trafficLightService: TrafficLightService) { }

  @Get()
  @Scopes('traffic_light:read')
  @ApiOperation({
    summary: 'Search traffic lights',
    description:
      'Search traffic lights by name, intersection ID, coordinates, or active status. If no parameters are provided, returns all traffic lights.',
  })
  @ApiOkResponse({
    type: [TrafficLightDto],
    description: 'List of traffic lights matching the search criteria',
  })
  @ApiBadRequestResponse({
    description: 'Invalid search parameters',
  })
  async search(
    @Query() searchDto: TrafficLightSearchDto,
  ): Promise<TrafficLightDto[]> {
    return this.trafficLightService.search(searchDto);
  }

  @Post()
  @Scopes('traffic_light:write')
  @ApiOperation({
    summary: 'Create a traffic light',
    description:
      'Creates a new traffic light at a specific intersection. The intersection must exist and the traffic light must be within 10 meters of it. IMPORTANT: The API key (raw) is only returned once during creation. Save it securely.',
  })
  @ApiCreatedResponse({
    type: CreateTrafficLightResponseDto,
    description:
      'Traffic light successfully created. The response includes the raw key which will NOT be available again.',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request: intersection does not exist, traffic light too far from intersection (>10m), another traffic light exists nearby (<5m), or invalid coordinates',
  })
  @ApiNotFoundResponse({
    description: 'Intersection not found',
  })
  @ApiConflictResponse({
    description: 'Traffic light already exists at these coordinates',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async create(
    @Body() createDto: CreateTrafficLightDto,
  ): Promise<CreateTrafficLightResponseDto> {
    return this.trafficLightService.create(createDto);
  }

  @Get(':id')
  @Scopes('traffic_light:read')
  @ApiOperation({
    summary: 'Get traffic light by ID',
    description: 'Retrieve a specific traffic light by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the traffic light',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    type: TrafficLightDto,
    description: 'Traffic light found',
  })
  @ApiNotFoundResponse({
    description: 'Traffic light not found',
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TrafficLightDto> {
    return this.trafficLightService.findById(id);
  }
}
