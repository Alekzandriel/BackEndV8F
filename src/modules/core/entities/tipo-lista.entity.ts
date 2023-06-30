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
import { ListaEntity } from './lista.entity';

@Entity('tipolistas', { schema: 'core' })
export class TipoListaEntity {
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

      @OneToMany(() => ListaEntity, (lista: ListaEntity) => lista.tipoLista)
      @JoinColumn({ name: 'idlista' })
      lista: ListaEntity;
      
    @Column('varchar', {
        name: 'nombre_tipo_lista',
        length: 50,
        nullable: true,
        unique: true,
        comment: 'Nombre del tipo de la lista',
    })
    nombreTipoLista: string;


}
