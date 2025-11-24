import {
  TrafficLight,
  TrafficLightSearchParams,
} from '@/shared/types/traffic-light.types';

export const TRAFFIC_LIGHT_REPOSITORY = 'TrafficLightRepository';

export interface TrafficLightRepository {
  /**
   * Busca semáforos por diferentes parámetros
   * @param params - Parámetros de búsqueda opcionales
   * @returns Lista de semáforos que coinciden con los criterios
   */
  search(params: TrafficLightSearchParams): Promise<TrafficLight[]>;

  /**
   * Busca un semáforo por su ID
   * @param id - ID del semáforo
   * @returns Semáforo encontrado o null
   */
  findById(id: number): Promise<TrafficLight | null>;
}
