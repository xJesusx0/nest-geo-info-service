import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/decorators/public.decorator';
import pkg from '../package.json';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Public()
  getInfo() {
    return {
      service: pkg.name ?? 'geo-info-service',
      version: pkg.version ?? '0.0.0',
      description:
        'Un microservicio que expone información geográfica de Barranquilla y sus barrios.',
      docs: '/docs',
      uptime: process.uptime(),
    };
  }

  @Get('health')
  @Public()
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
