import { UsuarioEntity } from '@auth/entities';
import { boolean } from 'joi';
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

  @Entity('carreras', {schema: 'core'})
  export class CarreraEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name:'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de la creacion de la carrera',
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

      @OneToMany(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.carrera)
      @JoinColumn({ name: 'cedulausuario' })
      usuarios: UsuarioEntity[];
    
    
      @Column('varchar', {
        name: 'nombre_carrera',
        nullable: true,
        length: 50,
        comment: 'Nombre de la carrera',
      })
      nombreCarrera: string;
    
      @Column({
        name: 'estado',
        type: 'varchar',       
        comment: 'Estado del candidato',
      })
      estado: string; 
  }