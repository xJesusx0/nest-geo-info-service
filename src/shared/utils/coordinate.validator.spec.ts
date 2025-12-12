import { BadRequestException } from '@nestjs/common';
import { CoordinateValidator } from './coordinate.validator';

describe('CoordinateValidator', () => {
  describe('validateLatitude', () => {
    it('should throw BadRequestException for latitude < -90', () => {
      expect(() => CoordinateValidator.validateLatitude(-91)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for latitude > 90', () => {
      expect(() => CoordinateValidator.validateLatitude(91)).toThrow(
        BadRequestException,
      );
    });

    it('should not throw for valid latitude', () => {
      expect(() => CoordinateValidator.validateLatitude(45)).not.toThrow();
    });
  });

  describe('validateLongitude', () => {
    it('should throw BadRequestException for longitude < -180', () => {
      expect(() => CoordinateValidator.validateLongitude(-181)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for longitude > 180', () => {
      expect(() => CoordinateValidator.validateLongitude(181)).toThrow(
        BadRequestException,
      );
    });

    it('should not throw for valid longitude', () => {
      expect(() => CoordinateValidator.validateLongitude(90)).not.toThrow();
    });
  });

  describe('validate', () => {
    it('should validate both latitude and longitude', () => {
      const validateLatSpy = jest.spyOn(
        CoordinateValidator,
        'validateLatitude',
      );
      const validateLonSpy = jest.spyOn(
        CoordinateValidator,
        'validateLongitude',
      );

      CoordinateValidator.validate(45, 90);

      expect(validateLatSpy).toHaveBeenCalledWith(45);
      expect(validateLonSpy).toHaveBeenCalledWith(90);
    });
  });
});
