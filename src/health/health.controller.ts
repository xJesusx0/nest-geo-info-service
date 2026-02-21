import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { Public } from '@/shared/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Verificar conexión a Supabase
      () =>
        this.http.pingCheck(
          'supabase',
          `${process.env.SUPABASE_URL}/rest/v1/`,
          {
            headers: {
              apikey: process.env.SUPABASE_KEY || '',
            },
          },
        ),
    ]);
  }

  @Get('ready')
  @Public()
  readiness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Service is ready to accept traffic',
    };
  }

  @Get('live')
  @Public()
  liveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Service is alive',
    };
  }
}
