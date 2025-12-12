import { ClassConstructor, plainToInstance } from 'class-transformer';

/**
 * Transforma un objeto plano o array de objetos planos a una instancia de clase (DTO).
 * Aplica automáticamente { excludeExtraneousValues: true } para seguridad.
 *
 * @param cls La clase DTO a la que se va a transformar
 * @param plain El objeto plano o array de objetos planos
 * @returns La instancia o array de instancias de la clase DTO
 */
export function toDto<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
export function toDto<T, V>(cls: ClassConstructor<T>, plain: V): T;
export function toDto<T, V>(cls: ClassConstructor<T>, plain: V | V[]): T | T[] {
  return plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
  });
}
