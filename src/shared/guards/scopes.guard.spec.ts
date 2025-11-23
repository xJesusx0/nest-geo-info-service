import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ScopesGuard } from './scopes.guard';

describe('ScopesGuard', () => {
  let guard: ScopesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new ScopesGuard(reflector);
  });

  const createMockContext = (handlerScopes: string[], userScopes: string[]) => {
    const request = { scopes: userScopes };
    const context = {
      getHandler: () => 'handler',
      getClass: () => 'class',
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(handlerScopes);

    return context;
  };

  it('should allow access if no scopes are required', () => {
    const context = createMockContext([], []);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access if user has exact scope', () => {
    const context = createMockContext(['countries:read'], ['countries:read']);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access if user has * scope', () => {
    const context = createMockContext(['countries:read'], ['*']);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access if user has resource wildcard scope', () => {
    const context = createMockContext(['countries:read'], ['countries:*']);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access if user is missing scope', () => {
    const context = createMockContext(['countries:read'], ['cities:read']);
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should deny access if user has no scopes', () => {
    const context = createMockContext(['countries:read'], []);
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should allow access if user has one of the required scopes', () => {
    // Assuming OR logic as implemented
    const context = createMockContext(
      ['countries:read', 'countries:write'],
      ['countries:write'],
    );
    expect(guard.canActivate(context)).toBe(true);
  });
});
