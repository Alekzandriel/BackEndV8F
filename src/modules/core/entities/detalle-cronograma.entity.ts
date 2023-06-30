import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import { PeriodoLectivoEntity } from './periodo-lectivo.entity';

@Entity('detalleCronogramas', { schema: 'core' })
export class DetalleCronogramaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de cracion del detalle del cronograma',
    })

    createdAt: Date;

    @UpdateDateColumn({
        name: 'update_at',
        type: 'timestamptz',
    })
    updateAt: Date;

    @DeleteDateColumn({
        name: 'delete_at',
        type: 'timestamptz',
    })
    deleteAt: Date;
    /*
      @OneToOne(() => CatalogueEntity)
      @JoinColumn({ name: 'address_id' })
      address: CatalogueEntity;
    
      @ManyToOne(() => CatalogueEntity)
      @JoinColumn({ name: 'state_id' })
      state: CatalogueEntity;
    */

    @ManyToOne(() => CronogramaEntity)
    @JoinColumn({ name: 'idcronograma' })
    cronogramas: CronogramaEntity;

    @ManyToOne(() => PeriodoLectivoEntity)
    @JoinColumn({ name: 'idperiodolectivo' })
    periodoLectivo: PeriodoLectivoEntity[];

    @Column({
        name: 'fecha_inicio_tarea_cronograma',
        type: 'varchar',
        comment: 'Fecha de inicio de tarea del cronograma',
    })
    fechaInicioTareaCronograma: string;

    @Column({
        name: 'fecha_finalizacion_tarea_cronograma',
        type: 'varchar',
        comment: 'Fecha de finalizacion de tarea del cronograma',
    })
    fechaFinalizacionTareaCronograma: string;

    @Column('varchar', {
        name: 'responsable_tarea_cronograma',
        nullable: true,
        length: 50,
        comment: 'Nombre del responsable de tarea del cronograma',
    })
    responsableTareaCronograma: string;

    @Column('varchar', {
        name: 'descripcion_detalle_tarea_cronograma',
        length: 500,
        comment: 'Descripcion de la tarea del cronograma',
    })
    descripcionDetalleTareaCronograma: string;

    @Column({
        name: 'estado_detalle_cronograma',
        type: 'varchar',
        comment: 'Estado del detalle del cronograma',
    })
    estadoDetalleCronograma: string;
    
}