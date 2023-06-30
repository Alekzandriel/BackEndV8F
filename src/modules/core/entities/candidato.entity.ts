import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { CandidatoListaEntity } from './candidato-lista.entity';

  @Entity('candidatos', {schema: 'core'})
  export class CandidatoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name:'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de la creacion del candidato',
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
    */

      @OneToMany(() => CandidatoListaEntity, (candidatoLista:CandidatoListaEntity)=>candidatoLista.candidatos)
      @JoinColumn({ name: 'idcandidatolista' })
      candidatosLista: CandidatoListaEntity;
  
      @Column('varchar', {
        name: 'dignidad_candidato',
        nullable: true,
        length: 50,
        comment: 'Nombre de la dignidad que ocupa el candidato',
      })
      dignidadCandidato: string;
    
      @Column('varchar', {
        name: 'matricula_candidato',
        length: 500,
        comment: 'Enlace al documento de matricula',
      })
      matriculaCandidato: string; 

    
  }
