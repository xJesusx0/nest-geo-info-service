import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a Geo Info Service — un microservicio que expone información geográfica de Barranquilla y sus barrios.';
  }
}
