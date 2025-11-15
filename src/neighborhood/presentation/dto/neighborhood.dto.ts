import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * DTO de respuesta para Neighborhood
 * Define exactamente qué campos se devuelven al cliente
 */
export class NeighborhoodDto {
  @ApiProperty({
    example: 163,
    description: 'Identificador único del barrio',
    type: Number,
  })
  @Expose()
  neighborhood_id: number;

  @ApiProperty({
    example: 'CORREGIMIENTO LA PLAYA',
    description: 'Nombre del barrio',
    type: String,
  })
  @Expose()
  neighborhood_name: string;

  @ApiProperty({
    example: 91,
    description: 'Identificador de la ciudad',
    type: Number,
  })
  @Expose()
  city_id: number;

  @ApiProperty({
    example: 'BARRANQUILLA',
    description: 'Nombre de la ciudad',
    type: String,
  })
  @Expose()
  city_name: string;

  @ApiProperty({
    example: '001',
    description: 'Código DANE de la ciudad',
    type: String,
  })
  @Expose()
  city_dane_code: string;

  @ApiProperty({
    example: 5,
    description: 'ID del departamento',
    type: Number,
  })
  @Expose()
  department_id: number;

  @ApiProperty({
    example: 'Atlántico',
    description: 'Nombre del departamento',
    type: String,
  })
  @Expose()
  department_name: string;

  @ApiProperty({
    example: '08',
    description: 'Código DANE del departamento',
    type: String,
  })
  @Expose()
  department_dane_code: string;

  @ApiProperty({
    example: 48,
    description: 'ID del país',
    type: Number,
  })
  @Expose()
  country_id: number;

  @ApiProperty({
    example: 'Colombia',
    description: 'Nombre del país',
    type: String,
  })
  @Expose()
  country_name: string;

  @ApiProperty({
    example: 'Otro o no especificado',
    description: 'Nombre de la localidad',
    type: String,
  })
  @Expose()
  locality_name: string;

  @ApiProperty({
    example: 'Otro o no especificado',
    description: 'Nombre del área urbana',
    type: String,
  })
  @Expose()
  urban_area_name: string;
}

/**
 * DTO para búsqueda de barrios por ubicación geográfica
 * Requiere coordenadas (latitude, longitude)
 */
export class QueryNeighborhoodDto {
  @ApiProperty({
    example: -74.872881,
    description: 'Longitud geográfica (WGS84, entre -180 y 180)',
  })
  @IsNotEmpty()
  @IsLongitude()
  @Type(() => Number)
  longitude: number;

  @ApiProperty({
    example: 11.031657,
    description: 'Latitud geográfica (WGS84, entre -90 y 90)',
  })
  @IsNotEmpty()
  @IsLatitude()
  @Type(() => Number)
  latitude: number;
}
