import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent, DataSource } from 'typeorm';
import { HistorialCambios } from '../../modules/system/entities/historial-cambios.entity';
import { Propiedad } from '../../modules/property/entities/propiedad.entity';
import { Reserva } from '../../modules/transaction/entities/reserva.entity';
import { Cuota } from '../../modules/transaction/entities/cuota.entity';
import { Pago } from '../../modules/transaction/entities/pago.entity';
import { Contrato } from '../../modules/transaction/entities/contrato.entity';
import { Usuario } from '../../modules/user/entities/usuario.entity';

@EventSubscriber()
export class HistorialSubscriber implements EntitySubscriberInterface {
  // Entidades a auditar
  listenTo() {
    return [Propiedad, Reserva, Cuota, Pago, Contrato, Usuario] as any;
  }

  private obtenerIdRegistro(entity: any): number {
    const posiblesIds = [
      'idPropiedad',
      'idReserva',
      'idCuota',
      'idPago',
      'idContrato',
      'idUsuario',
      'id',
    ];

    for (const prop of posiblesIds) {
      if (entity[prop] !== undefined && entity[prop] !== null) {
        return entity[prop];
      }
    }

    return 0;
  }

  async afterInsert(event: InsertEvent<any>): Promise<void> {
    if (!event.entity) return;
    const historialRepo = event.manager.getRepository(HistorialCambios);

    const entity = event.entity as any;
    const idRegistro = this.obtenerIdRegistro(entity);

    const nuevoHistorial = historialRepo.create({
      entidadAfectada: entity.constructor.name,
      idRegistro,
      accion: 'INSERT',
      valoresAnteriores: null,
      valoresNuevos: this.sanitizarDatos(entity),
      idUsuario: entity.idUsuario || null,
    });

    await historialRepo.save(nuevoHistorial);
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<void> {
    if (!event.entity) return;
    const historialRepo = event.manager.getRepository(HistorialCambios);

    const entity = event.entity as any;
    const idRegistro = this.obtenerIdRegistro(entity);
    const valoresAnteriores = event.databaseEntity ? this.sanitizarDatos(event.databaseEntity) : null;
    const valoresNuevos = this.sanitizarDatos(entity);

    const nuevoHistorial = historialRepo.create({
      entidadAfectada: entity.constructor.name,
      idRegistro,
      accion: 'UPDATE',
      valoresAnteriores,
      valoresNuevos,
      idUsuario: entity.idUsuario || null,
    });

    await historialRepo.save(nuevoHistorial);
  }

  async afterRemove(event: RemoveEvent<any>): Promise<void> {
    if (!event.entity) return;
    const historialRepo = event.manager.getRepository(HistorialCambios);

    const entity = event.entity as any;
    const idRegistro = this.obtenerIdRegistro(entity);

    const nuevoHistorial = historialRepo.create({
      entidadAfectada: entity.constructor.name,
      idRegistro,
      accion: 'DELETE',
      valoresAnteriores: this.sanitizarDatos(entity),
      valoresNuevos: null,
      idUsuario: entity.idUsuario || null,
    });

    await historialRepo.save(nuevoHistorial);
  }

  private sanitizarDatos(entity: any): Record<string, any> {
    const sanitizado: Record<string, any> = {};

    for (const [key, value] of Object.entries(entity)) {
      // Ignorar relaciones y métodos
      if (typeof value === 'function' || Array.isArray(value) || (typeof value === 'object' && value !== null && !(value instanceof Date))) {
        continue;
      }

      sanitizado[key] = value;
    }

    return sanitizado;
  }
}
