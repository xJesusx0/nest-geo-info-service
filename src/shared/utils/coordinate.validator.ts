import { BadRequestException } from '@nestjs/common';

export class CoordinateValidator {
  static validateLatitude(latitude: number): void {
    if (latitude < -90 || latitude > 90) {
      throw new BadRequestException(
        `Latitud inválida: ${latitude}. Debe estar entre -90 y 90`,
      );
    }
  }

  static validateLongitude(longitude: number): void {
    if (longitude < -180 || longitude > 180) {
      throw new BadRequestException(
        `Longitud inválida: ${longitude}. Debe estar entre -180 y 180`,
      );
    }
  }

  static validate(latitude: number, longitude: number): void {
    this.validateLatitude(latitude);
    this.validateLongitude(longitude);
  }
}
