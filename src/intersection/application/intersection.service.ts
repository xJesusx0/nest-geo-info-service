import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { toDto } from '@/shared/utils/dto-transformer';
import { STREET_INTERSECTION_REPOSITORY } from '../domain/intersection.repository';
import type { StreetIntersectionRepository } from '../domain/intersection.repository';
import { StreetIntersectionByPointParams } from '@/shared/types/intersection.types';
import {
  CreateIntersectionDto,
  IntersectionResponseDto,
  StreetIntersectionByPointDto,
} from '../presentation/dto/intersection.dto';

@Injectable()
export class IntersectionService {
  constructor(
    @Inject(STREET_INTERSECTION_REPOSITORY)
    private readonly intersectionRepository: StreetIntersectionRepository,
  ) {}

  async getByPoint(
    params: StreetIntersectionByPointParams,
  ): Promise<StreetIntersectionByPointDto[]> {
    const intersections = await this.intersectionRepository.getByPoint(params);
    return toDto(StreetIntersectionByPointDto, intersections);
  }

  async createIntersection(
    createDto: CreateIntersectionDto,
  ): Promise<IntersectionResponseDto> {
    const streetAId = createDto.street_a_id;
    const streetBId = createDto.street_b_id;

    // Validación: los IDs deben ser diferentes
    if (streetAId === streetBId) {
      throw new BadRequestException(
        'Los IDs de las calles deben ser diferentes para crear una intersección',
      );
    }

    // Validación: los IDs deben ser números positivos
    if (streetAId <= 0 || streetBId <= 0) {
      throw new BadRequestException(
        'Los IDs de las calles deben ser números positivos',
      );
    }

    // Intentar crear la intersección usando la función de base de datos
    const intersection = await this.intersectionRepository.createIntersection(
      streetAId,
      streetBId,
    );

    // Transformar el resultado al DTO de respuesta
    return toDto(IntersectionResponseDto, intersection);
  }
}
