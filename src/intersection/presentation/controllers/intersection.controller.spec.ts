import { Test, TestingModule } from '@nestjs/testing';
import { IntersectionController } from './intersection.controller';
import { IntersectionService } from '../../application/intersection.service';
import { IntersectionResponseDto } from '../../dto/intersection.dto';

describe('IntersectionController', () => {
  let controller: IntersectionController;
  let serviceMock: Record<string, jest.Mock>;

  const mockIntersectionResponse = {
    id: 1,
    street_a_id: 10,
    street_b_id: 20,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(async () => {
    serviceMock = {
      getById: jest.fn(),
      getByPoint: jest.fn(),
      createIntersection: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntersectionController],
      providers: [
        {
          provide: IntersectionService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<IntersectionController>(IntersectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getById', () => {
    it('should call service.getById and return the result', async () => {
      serviceMock.getById.mockResolvedValue(mockIntersectionResponse);

      const result = await controller.getById(1);

      expect(result).toEqual(mockIntersectionResponse);
      expect(serviceMock.getById).toHaveBeenCalledWith(1);
    });
  });
});
