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
import { ListaEntity } from './lista.entity';

@Entity('votos', { schema: 'core' })
export class VotoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
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
    
      @ManyToOne(() => CatalogueEntity)
      @JoinColumn({ name: 'state_id' })
      state: CatalogueEntity;
    */
   
 
      @ManyToOne(() => ListaEntity)
      @JoinColumn({ name: 'idlista' })
      lista: ListaEntity;

    @Column({
        name: 'hora_voto',
        type: 'varchar',
        comment: 'Hora en que se ejercio el voto',
    })

    horaVoto: string;



    @Column ({
        name: 'clase_voto',
        type: 'varchar',
        comment: 'El voto. Ej. Lista A'
    })

    claseVoto: string;

    
}