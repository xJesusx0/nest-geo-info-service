import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * DTO de respuesta para City
 * Define exactamente qué campos se devuelven al cliente
 */
export class CityDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la ciudad',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Bogotá',
    description: 'Nombre de la ciudad',
    type: String,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    example: '003',
    description: 'Código DANE de la ciudad',
    type: String,
  })
  @Expose()
  dane_code?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del departamento al que pertenece',
    type: Number,
  })
  @Expose()
  department_id?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del país al que pertenece',
    type: Number,
  })
  @Expose()
  country_id?: number;
}

/**
 * DTO de respuesta para City con relaciones
 * Incluye información del departamento y país
 */
export class CityWithRelationsDto {
  @ApiProperty({
    example: 91,
    description: 'Identificador único de la ciudad',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Bogotá',
    description: 'Nombre de la ciudad',
    type: String,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    example: '001',
    description: 'Código DANE de la ciudad',
    type: String,
  })
  @Expose()
  dane_code?: string;

  @ApiPropertyOptional({
    example: 'Atlántico',
    description: 'Nombre del departamento',
    type: String,
  })
  @Expose()
  department_name?: string;

  @ApiPropertyOptional({
    example: '08',
    description: 'Código DANE del departamento',
    type: String,
  })
  @Expose()
  department_dane_code?: string;

  @ApiPropertyOptional({
    example: 'Colombia',
    description: 'Nombre del país',
    type: String,
  })
  @Expose()
  country_name_es?: string;

  @ApiPropertyOptional({
    example: 'Colombia',
    description: 'Nombre del país en inglés',
    type: String,
  })
  @Expose()
  country_name_en?: string;
}

/**
 * DTO para queries/filtros en búsqueda de ciudades
 */
export class QueryCityDto {
  @ApiPropertyOptional({
    example: 48,
    description: 'Filtro por ID del país',
  })
  @IsOptional()
  @Type(() => Number)
  countryId?: number;

  @ApiPropertyOptional({
    example: 91,
    description: 'Filtro por ID del departamento',
  })
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional({
    example: 'Barranquilla',
    description: 'Filtro por nombre de ciudad (búsqueda parcial)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '001',
    description: 'Filtro por código DANE',
  })
  @IsOptional()
  @IsString()
  daneCode?: string;

  @ApiPropertyOptional({
    example: 'Colombia',
    description: 'Filtro por nombre de país (búsqueda parcial)',
  })
  @IsOptional()
  @IsString()
  countryName?: string;

  @ApiPropertyOptional({
    example: 'Atlántico',
    description: 'Filtro por nombre de departamento (búsqueda parcial)',
  })
  @IsOptional()
  @IsString()
  departmentName?: string;
}
