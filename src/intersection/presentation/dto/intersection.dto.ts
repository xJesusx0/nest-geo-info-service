import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class StreetIntersectionByPointDto {
  @ApiProperty({
    example: 123,
    description: 'Identificador único de la intersección',
    type: Number,
  })
  @Expose({ name: 'intersection_id' })
  intersection_id: number;

  @ApiProperty({
    example: 45,
    description: 'ID de la primera calle',
    type: Number,
  })
  @Expose({ name: 'street_a_id' })
  street_a_id: number;

  @ApiProperty({
    example: 'Calle 50',
    description: 'Nombre de la primera calle',
    type: String,
  })
  @Expose({ name: 'street_a_name' })
  street_a_name: string;

  @ApiProperty({
    example: 67,
    description: 'ID de la segunda calle',
    type: Number,
  })
  @Expose({ name: 'street_b_id' })
  street_b_id: number;

  @ApiProperty({
    example: 'Carrera 20',
    description: 'Nombre de la segunda calle',
    type: String,
  })
  @Expose({ name: 'street_b_name' })
  street_b_name: string;

  @ApiProperty({
    example: 15.5,
    description: 'Distancia en metros desde el punto de consulta',
    type: Number,
  })
  @Expose({ name: 'distance_meters' })
  distance_meters: number;

  @ApiProperty({
    example: '{"type":"Point","coordinates":[-74.0,4.0]}',
    description: 'Geometría de la intersección en formato GeoJSON',
    type: String,
  })
  @Expose()
  geojson: string;
}

export class IntersectionQueryDto {
  @ApiProperty({
    example: 4.6097,
    description: 'Latitud del punto central',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    example: -74.0817,
    description: 'Longitud del punto central',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @ApiProperty({
    example: 500,
    description: 'Radio de búsqueda en metros',
    type: Number,
    required: false,
    default: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  radius: number = 100;

  @ApiProperty({
    example: 10,
    description: 'Límite de resultados',
    type: Number,
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}

export class CreateIntersectionDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la primera calle',
    type: Number,
  })
  @IsNumber()
  @IsPositive({ message: 'El ID de la calle A debe ser un número positivo' })
  @Type(() => Number)
  streetAId: number;

  @ApiProperty({
    example: 2,
    description: 'ID de la segunda calle',
    type: Number,
  })
  @IsNumber()
  @IsPositive({ message: 'El ID de la calle B debe ser un número positivo' })
  @Type(() => Number)
  streetBId: number;
}

export class IntersectionResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la intersección',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la primera calle',
    type: Number,
  })
  @Expose()
  street_a_id: number;

  @ApiProperty({
    example: 2,
    description: 'ID de la segunda calle',
    type: Number,
  })
  @Expose()
  street_b_id: number;

  @ApiProperty({
    example: true,
    description: 'Estado activo de la intersección',
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
