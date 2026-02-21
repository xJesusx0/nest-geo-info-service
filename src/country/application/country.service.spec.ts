import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { COUNTRY_REPOSITORY } from '../domain/country.repository';
import { CountryDto } from '../presentation/dto/country.dto';

describe('CountryService', () => {
  let service: CountryService;
  let repositoryMock: Record<string, jest.Mock>;

  const mockCountries = [
    {
      id: 1,
      name_es: 'País 1',
      name_en: 'Country 1',
      iso_alpha2_code: 'C1',
      iso_alpha3_code: 'CO1',
      iso_numeric_code: '1',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name_es: 'País 2',
      name_en: 'Country 2',
      iso_alpha2_code: 'C2',
      iso_alpha3_code: 'CO2',
      iso_numeric_code: '2',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  beforeEach(async () => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: COUNTRY_REPOSITORY,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCountries', () => {
    it('should return an array of CountryDto', async () => {
      repositoryMock.findAll.mockResolvedValue(mockCountries);

      const result = await service.getAllCountries({});

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(CountryDto);
      expect(result[0].name_es).toBe('País 1');
      expect(repositoryMock.findAll).toHaveBeenCalledWith({});
    });

    it('should pass query params to repository', async () => {
      repositoryMock.findAll.mockResolvedValue([]);
      const query = { name: 'Test' };

      await service.getAllCountries(query);

      expect(repositoryMock.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('getCountryById', () => {
    it('should return a CountryDto if found', async () => {
      repositoryMock.findById.mockResolvedValue(mockCountries[0]);

      const result = await service.getCountryById(1);

      expect(result).toBeInstanceOf(CountryDto);
      expect(result?.name_es).toBe('País 1');
      expect(repositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should return null if not found', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      const result = await service.getCountryById(999);

      expect(result).toBeNull();
      expect(repositoryMock.findById).toHaveBeenCalledWith(999);
    });
  });
});
