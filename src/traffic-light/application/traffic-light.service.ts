import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TRAFFIC_LIGHT_REPOSITORY } from '../domain/traffic-light.repository';
import type { TrafficLightRepository } from '../domain/traffic-light.repository';
import {
  TrafficLightDto,
  TrafficLightSearchDto,
} from '../presentation/dto/traffic-light.dto';

@Injectable()
export class TrafficLightService {
  constructor(
    @Inject(TRAFFIC_LIGHT_REPOSITORY)
    private readonly trafficLightRepository: TrafficLightRepository,
  ) { }

  /**
   * Busca semáforos según los parámetros proporcionados
   * Si no se proporcionan parámetros, retorna todos los semáforos
   */
  async search(searchDto: TrafficLightSearchDto): Promise<TrafficLightDto[]> {
    const trafficLights = await this.trafficLightRepository.search(searchDto);

    return plainToInstance(TrafficLightDto, trafficLights, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Busca un semáforo por su ID
   * @throws NotFoundException si no se encuentra el semáforo
   */
  async findById(id: number): Promise<TrafficLightDto> {
    if (id <= 0) {
      throw new NotFoundException(`ID inválido: ${id}`);
    }

    const trafficLight = await this.trafficLightRepository.findById(id);

    if (!trafficLight) {
      throw new NotFoundException(
        `No se encontró el semáforo con ID ${id}`,
      );
    }

    return plainToInstance(TrafficLightDto, trafficLight, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Obtiene todos los semáforos de una intersección específica
   */
  async findByIntersection(intersectionId: number): Promise<TrafficLightDto[]> {
    if (intersectionId <= 0) {
      throw new NotFoundException(`ID de intersección inválido: ${intersectionId}`);
    }

    const trafficLights = await this.trafficLightRepository.search({
      intersectionId,
    });

    return plainToInstance(TrafficLightDto, trafficLights, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Busca semáforos por coordenadas exactas
   */
  async findByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<TrafficLightDto[]> {
    const trafficLights = await this.trafficLightRepository.search({
      latitude,
      longitude,
    });

    return plainToInstance(TrafficLightDto, trafficLights, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Obtiene solo los semáforos activos
   */
  async findActive(): Promise<TrafficLightDto[]> {
    const trafficLights = await this.trafficLightRepository.search({
      active: true,
    });

    return plainToInstance(TrafficLightDto, trafficLights, {
      excludeExtraneousValues: true,
    });
  }
}
