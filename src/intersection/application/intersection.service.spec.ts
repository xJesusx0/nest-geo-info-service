import { Test, TestingModule } from '@nestjs/testing';
import { IntersectionService } from './intersection.service';
import { STREET_INTERSECTION_REPOSITORY } from '../domain/intersection.repository';
import { IntersectionResponseDto } from '../presentation/dto/intersection.dto';
import { NotFoundException } from '@nestjs/common';

describe('IntersectionService', () => {
  let service: IntersectionService;
  let repositoryMock: Record<string, jest.Mock>;

  const mockIntersection = {
    id: 1,
    street_a_id: 10,
    street_b_id: 20,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(async () => {
    repositoryMock = {
      getById: jest.fn(),
      getByPoint: jest.fn(),
      createIntersection: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntersectionService,
        {
          provide: STREET_INTERSECTION_REPOSITORY,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<IntersectionService>(IntersectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return an IntersectionResponseDto if found', async () => {
      repositoryMock.getById.mockResolvedValue(mockIntersection);

      const result = await service.getById(1);

      expect(result).toBeInstanceOf(IntersectionResponseDto);
      expect(result.id).toBe(1);
      expect(repositoryMock.getById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if not found', async () => {
      repositoryMock.getById.mockResolvedValue(null);

      await expect(service.getById(999)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.getById).toHaveBeenCalledWith(999);
    });
  });
});
