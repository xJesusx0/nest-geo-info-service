import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * DTO de respuesta para Country
 * Define exactamente qué campos se devuelven al cliente
 */
export class CountryDto {
  @ApiProperty({
    example: 48,
    description: 'Identificador único del país',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Colombia',
    description: 'Nombre del país en español',
    type: String,
  })
  @Expose()
  name_es: string;

  @ApiProperty({
    example: 'Colombia',
    description: 'Nombre del país en inglés',
    type: String,
  })
  @Expose()
  name_en: string;

  @ApiPropertyOptional({
    example: 'CO',
    description: 'Código ISO alpha-2 (2 letras)',
    type: String,
  })
  @Expose()
  iso_alpha2_code?: string;

  @ApiPropertyOptional({
    example: 'COL',
    description: 'Código ISO alpha-3 (3 letras)',
    type: String,
  })
  @Expose()
  iso_alpha3_code?: string;

  @ApiPropertyOptional({
    example: '170',
    description: 'Código numérico ISO',
    type: Number,
  })
  @Expose()
  iso_numeric_code?: number;
}

/**
 * DTO para queries/filtros en búsqueda de países
 */
export class CountryQueryDto {
  @ApiPropertyOptional({
    example: 'Colombia',
    description: 'Filtro por nombre (búsqueda parcial ilike)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'CO',
    description: 'Filtro por código ISO alpha-2',
  })
  @IsOptional()
  @IsString()
  isoAlpha2Code?: string;

  @ApiPropertyOptional({
    example: 'COL',
    description: 'Filtro por código ISO alpha-3',
  })
  @IsOptional()
  @IsString()
  isoAlpha3Code?: string;

  @ApiPropertyOptional({
    example: '170',
    description: 'Filtro por código numérico ISO',
  })
  @IsOptional()
  @IsString()
  isoNumericCode?: string;
}
