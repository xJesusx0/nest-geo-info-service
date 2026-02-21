import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './api-key.guard';
import { ApiKeyService } from '@/api-key/application/api-key.service';
import { ApiKey } from '../types/api-key.types';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  const mockApiKeyService = {
    findByKey: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: ApiKeyService,
          useValue: mockApiKeyService,
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockContext = (headers: Record<string, unknown> = {}) => {
    const request = {
      headers,
      scopes: [] as string[],
    };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return false if x-api-key header is missing', async () => {
    const context = createMockContext({});
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return false if x-api-key header is an array', async () => {
    const context = createMockContext({ 'x-api-key': ['key1', 'key2'] });
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return false if api key is not found', async () => {
    mockApiKeyService.findByKey.mockResolvedValue(null);
    const context = createMockContext({ 'x-api-key': 'invalid-key' });
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
    expect(mockApiKeyService.findByKey).toHaveBeenCalledWith('invalid-key');
  });

  it('should return false if api key is inactive', async () => {
    const apiKey: Partial<ApiKey> = {
      active: false,
      scopes: [],
      client_origin: [],
    };
    mockApiKeyService.findByKey.mockResolvedValue(apiKey);
    const context = createMockContext({ 'x-api-key': 'inactive-key' });
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return false if api key is expired', async () => {
    const apiKey: Partial<ApiKey> = {
      active: true,
      expires_at: new Date(Date.now() - 10000).toISOString(), // Expired 10s ago
      scopes: [],
      client_origin: [],
    };
    mockApiKeyService.findByKey.mockResolvedValue(apiKey);
    const context = createMockContext({ 'x-api-key': 'expired-key' });
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return false if origin is not allowed', async () => {
    const apiKey: Partial<ApiKey> = {
      active: true,
      scopes: [],
      client_origin: ['https://allowed.com'],
    };
    mockApiKeyService.findByKey.mockResolvedValue(apiKey);
    const context = createMockContext({
      'x-api-key': 'valid-key',
      origin: 'https://not-allowed.com',
    });
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return true if origin is allowed', async () => {
    const apiKey: Partial<ApiKey> = {
      active: true,
      scopes: [],
      client_origin: ['https://allowed.com'],
    };
    mockApiKeyService.findByKey.mockResolvedValue(apiKey);
    const context = createMockContext({
      'x-api-key': 'valid-key',
      origin: 'https://allowed.com',
    });
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should return true if no origin restrictions', async () => {
    const apiKey: Partial<ApiKey> = {
      active: true,
      scopes: [],
      client_origin: [], // No restrictions
    };
    mockApiKeyService.findByKey.mockResolvedValue(apiKey);
    const context = createMockContext({
      'x-api-key': 'valid-key',
      origin: 'https://any-origin.com',
    });
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should attach scopes to request and return true', async () => {
    const scopes = ['read:data', 'write:data'];
    const apiKey: Partial<ApiKey> = {
      active: true,
      scopes: scopes,
      client_origin: [],
    };
    mockApiKeyService.findByKey.mockResolvedValue(apiKey);
    const context = createMockContext({ 'x-api-key': 'valid-key' });

    const result = await guard.canActivate(context);

    expect(result).toBe(true);

    const request = context.switchToHttp().getRequest<unknown>() as {
      scopes: string[];
    };
    expect(request.scopes).toEqual(scopes);
  });
});
