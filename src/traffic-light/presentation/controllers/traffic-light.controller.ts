import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Scopes } from '@/shared/decorators/scopes.decorator';
import { TrafficLightService } from '../../application/traffic-light.service';
import {
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
  async search(
    @Query() searchDto: TrafficLightSearchDto,
  ): Promise<TrafficLightDto[]> {
    return this.trafficLightService.search(searchDto);
  }

  @Get('active')
  @Scopes('traffic_light:read')
  @ApiOperation({
    summary: 'Get active traffic lights',
    description: 'Retrieve all active traffic lights',
  })
  @ApiOkResponse({
    type: [TrafficLightDto],
    description: 'List of active traffic lights',
  })
  async findActive(): Promise<TrafficLightDto[]> {
    return this.trafficLightService.findActive();
  }

  @Get('intersection/:intersectionId')
  @Scopes('traffic_light:read')
  @ApiOperation({
    summary: 'Get traffic lights by intersection',
    description: 'Retrieve all traffic lights at a specific intersection',
  })
  @ApiParam({
    name: 'intersectionId',
    description: 'ID of the intersection',
    type: Number,
    example: 123,
  })
  @ApiOkResponse({
    type: [TrafficLightDto],
    description: 'List of traffic lights at the intersection',
  })
  @ApiNotFoundResponse({
    description: 'Invalid intersection ID',
  })
  async findByIntersection(
    @Param('intersectionId', ParseIntPipe) intersectionId: number,
  ): Promise<TrafficLightDto[]> {
    return this.trafficLightService.findByIntersection(intersectionId);
  }

  @Get('coordinates')
  @Scopes('traffic_light:read')
  @ApiOperation({
    summary: 'Get traffic lights by coordinates',
    description: 'Retrieve traffic lights at exact coordinates',
  })
  @ApiOkResponse({
    type: [TrafficLightDto],
    description: 'List of traffic lights at the coordinates',
  })
  async findByCoordinates(
    @Query('latitude', ParseIntPipe) latitude: number,
    @Query('longitude', ParseIntPipe) longitude: number,
  ): Promise<TrafficLightDto[]> {
    return this.trafficLightService.findByCoordinates(latitude, longitude);
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
