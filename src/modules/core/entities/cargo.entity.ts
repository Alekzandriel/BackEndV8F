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
import { CandidatoListaEntity } from './candidato-lista.entity';

@Entity('cargos', { schema: 'core' })
export class CargoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de la asignacion del cargo',
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

      @OneToMany(() => CandidatoListaEntity, (candidatoLista:CandidatoListaEntity)=>candidatoLista.cargos)
      @JoinColumn({ name: 'idcandidatolista' })
      candidatosLista: CandidatoListaEntity;

    @Column('varchar', {
        name: 'nombre_cargo',
        nullable: true,
        length: 50,
        comment: 'Nombre del cargo',
    })
    nombreCargo: string;

}