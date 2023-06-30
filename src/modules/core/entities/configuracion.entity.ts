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
  
  @Entity('configuraciones', { schema: 'core' })
  export class ConfiguracionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de configuracion',
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
    @Column('varchar', {
      name: 'codigo_reseteo_clave',
      length: 4,
      nullable: true,
      unique: true,
      comment: 'Codigo reseteo clave',
    })
    codigoReseteoClave: string;
  
    @Column({
      name: 'fecha_codigo_reseteo_clave',
      type: 'varchar',
      comment: 'Fecha de emision del codigo de reseteo'
    })
    fechaCodigoReseteoClave: string;
  
    @Column({
      name: 'duracion_codigo_reseteo_clave',
      type: 'varchar',
      comment: 'Tiempo de duracion del codigo ej. 5 min',
    })
    duracionCodigoReseteoClave: string;
  
    @Column ({
      name: 'fecha_vencimiento_codigo_reseteo',
      type: 'varchar',
      comment: 'Tiempo de duracion del codigo. Ej. 11/07/2023 23:59:59',
    })
  
    fechaVencimientoCodigoReseteo:string;
  }