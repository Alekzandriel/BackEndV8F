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
import { CandidatoEntity } from './candidato.entity';
import { CargoEntity } from './cargo.entity';
import { ListaEntity } from './lista.entity';
import { UsuarioEntity } from '@auth/entities';

@Entity('candidatoListas', { schema: 'core' })
export class CandidatoListaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de la creacion de candidato-lista',
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

  @OneToMany(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.candidatosLista)
  @JoinColumn({ name: 'cedulausuario' })
  usuarios: UsuarioEntity;

  @ManyToOne(() => ListaEntity)
  @JoinColumn({ name: 'idlista' })
  lista: ListaEntity;
 
  @ManyToOne(() => CargoEntity)
  @JoinColumn({ name: 'idcargo' })
  cargos: CargoEntity;
  
  @ManyToOne(() => CandidatoListaEntity)
  @JoinColumn({ name: 'idcandidatolista' })
  candidatos: CandidatoListaEntity;

}
