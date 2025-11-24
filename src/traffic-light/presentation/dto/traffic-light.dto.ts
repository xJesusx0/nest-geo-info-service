import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class TrafficLightDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del semáforo',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Semáforo Principal Norte',
    description: 'Nombre del semáforo',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 123,
    description: 'ID de la intersección donde está ubicado',
    type: Number,
  })
  @Expose()
  intersection_id: number;

  @ApiProperty({
    example: 4.6097,
    description: 'Latitud del semáforo',
    type: Number,
  })
  @Expose()
  latitude: number;

  @ApiProperty({
    example: -74.0817,
    description: 'Longitud del semáforo',
    type: Number,
  })
  @Expose()
  longitude: number;

  @ApiProperty({
    example: 'abc123...',
    description: 'Hash único del semáforo',
    type: String,
  })
  @Expose()
  key_hash: string;

  @ApiProperty({
    example: true,
    description: 'Estado activo del semáforo',
    type: Boolean,
  })
  @Expose()
  active: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Fecha de creación',
    type: String,
  })
  @Expose()
  created_at: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Fecha de última actualización',
    type: String,
  })
  @Expose()
  updated_at: string;
}

export class TrafficLightSearchDto {
  @ApiProperty({
    example: 'Principal',
    description: 'Nombre del semáforo (búsqueda parcial)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 123,
    description: 'ID de la intersección',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  intersectionId?: number;

  @ApiProperty({
    example: 4.6097,
    description: 'Latitud exacta',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({
    example: -74.0817,
    description: 'Longitud exacta',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @ApiProperty({
    example: true,
    description: 'Filtrar solo semáforos activos o inactivos',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  active?: boolean;
}

export class CreateTrafficLightDto {
  @ApiProperty({
    example: 'Semáforo Principal Norte',
    description: 'Nombre del semáforo',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 123,
    description: 'ID de la intersección donde estará ubicado',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  intersectionId: number;

  @ApiProperty({
    example: 4.6097,
    description: 'Latitud del semáforo',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    example: -74.0817,
    description: 'Longitud del semáforo',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  longitude: number;
}

export class CreateTrafficLightResponseDto extends TrafficLightDto {
  @ApiProperty({
    example: 'raw-key-xyz-123-abc',
    description:
      'Clave del semáforo en formato raw (sin hashear). IMPORTANTE: Este campo solo se expone durante la creación. Guárdelo de forma segura.',
    type: String,
  })
  @Expose()
  key: string;
}
