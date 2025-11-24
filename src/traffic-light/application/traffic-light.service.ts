import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { TRAFFIC_LIGHT_REPOSITORY } from '../domain/traffic-light.repository';
import type { TrafficLightRepository } from '../domain/traffic-light.repository';
import {
  CreateTrafficLightDto,
  CreateTrafficLightResponseDto,
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
      throw new NotFoundException(`No se encontró el semáforo con ID ${id}`);
    }

    return plainToInstance(TrafficLightDto, trafficLight, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Crea un nuevo semáforo
   * Genera automáticamente una key única y su hash
   * IMPORTANTE: La key en raw solo se retorna una vez durante la creación
   */
  async create(
    createDto: CreateTrafficLightDto,
  ): Promise<CreateTrafficLightResponseDto> {
    const { name, intersectionId, latitude, longitude } = createDto;

    // Validar coordenadas
    if (latitude < -90 || latitude > 90) {
      throw new NotFoundException(
        `Latitud inválida: ${latitude}. Debe estar entre -90 y 90`,
      );
    }

    if (longitude < -180 || longitude > 180) {
      throw new NotFoundException(
        `Longitud inválida: ${longitude}. Debe estar entre -180 y 180`,
      );
    }

    // Generar una key única en raw (esta se expone solo una vez)
    const rawKey = randomUUID();

    // Hashear la key para guardarla en la base de datos
    const keyHash = Buffer.from(rawKey).toString('base64');

    // Crear el semáforo en la base de datos con el hash
    const trafficLight = await this.trafficLightRepository.create({
      name,
      intersectionId,
      latitude,
      longitude,
      keyHash,
    });

    // Convertir a DTO y agregar la key raw
    const trafficLightDto = plainToInstance(
      CreateTrafficLightResponseDto,
      trafficLight,
      {
        excludeExtraneousValues: true,
      },
    );

    // Asignar la key raw (solo se expone en la creación)
    trafficLightDto.key = rawKey;

    return trafficLightDto;
  }
}
