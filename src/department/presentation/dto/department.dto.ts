import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * DTO de respuesta para Department
 * Define exactamente qué campos se devuelven al cliente
 */
export class DepartmentDto {
  @ApiProperty({
    example: 5,
    description: 'Identificador único del departamento',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Atlántico.',
    description: 'Nombre del departamento',
    type: String,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    example: '08',
    description: 'Código DANE del departamento',
    type: String,
  })
  @Expose()
  dane_code?: string;

  @ApiPropertyOptional({
    example: 48,
    description: 'ID del país al que pertenece',
    type: Number,
  })
  @Expose()
  country_id?: number;
}

/**
 * DTO para queries/filtros en búsqueda de departamentos
 */
export class QueryDepartmentDto {
  @ApiPropertyOptional({
    example: 'Atlántico',
    description: 'Filtro por nombre (búsqueda parcial)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '08',
    description: 'Filtro por código DANE',
  })
  @IsOptional()
  @IsString()
  daneCode?: string;

  @ApiPropertyOptional({
    example: 48,
    description: 'Filtro por ID del país',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  countryId?: number;
}
