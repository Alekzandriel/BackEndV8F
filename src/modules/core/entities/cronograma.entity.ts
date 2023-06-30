import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { DetalleCronogramaEntity } from './detalle-cronograma.entity';

  @Entity('cronogramas', {schema: 'core'})
export class CronogramaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name:'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion de actividad del cronograma',
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
      @OneToMany(() => DetalleCronogramaEntity, (detalleCronograma:DetalleCronogramaEntity)=>detalleCronograma.cronogramas)
      @JoinColumn({ name: 'iddetallecronograma' })
      cronogramas: DetalleCronogramaEntity;
/*
      @ManyToOne(() => CronogramaEntity)
      @JoinColumn({ name: 'idcronograma' })
      cronograma: CronogramaEntity [];
*/
      @Column('varchar', {
        name: 'periodo_lectivo',
        length: 10,
        nullable: true,
        unique: true,
        comment: 'Periodo lectivo en que se lleva a cabo el proceso electoral',
      })
      periodoLectivo: string;
    
      @Column({
        name: 'fecha_creacion_cronograma',
        type: 'varchar',
        comment: 'Fecha de creacion del cronograma',
      })

      fechaCreacionCronograma: string;
    
      @Column('varchar', {
        name: 'responsable_cronograma',
        length: 50,
        comment: 'Nombre del responsable del cronograma',
      })
      responsableCronograma: string; 
  }
