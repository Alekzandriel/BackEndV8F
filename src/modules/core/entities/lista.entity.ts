import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { PeriodoLectivoEntity } from './periodo-lectivo.entity';
import { VotoEntity } from './voto.entity';
import { TipoListaEntity } from './tipo-lista.entity';
import { CandidatoListaEntity } from './candidato-lista.entity';

@Entity('listas', { schema: 'core' })
export class ListaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de la creacion de la lista',
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

  @OneToMany(() => CandidatoListaEntity, (candidatoLista: CandidatoListaEntity) => candidatoLista.lista)
  @JoinColumn({ name: 'idcandidatolista' })
  candidatosLista: CandidatoListaEntity;

  @ManyToOne(() => PeriodoLectivoEntity)
  @JoinColumn({ name: 'idperiodolectivo' })
  periodoLectivo: PeriodoLectivoEntity;

  @ManyToOne(() => TipoListaEntity)
  @JoinColumn({ name: 'idtipolista' })
  tipoLista: TipoListaEntity;

  @OneToMany(() => VotoEntity, (voto: VotoEntity) => voto.lista)
  @JoinColumn({ name: 'idvoto' })
  votos: VotoEntity[];

  @Column('varchar', {
    name: 'nombre_lista',
    length: 10,
    nullable: true,
    unique: true,
    comment: 'Nombre de la lista',
  })
  nombreLista: string;

  @Column('varchar', {
    name: 'eslogan_lista',
    nullable: true,
    length: 500,
    comment: 'Eslogan de la lista',
  })
  esloganLista: string;

  @Column('varchar', {
    name: 'plan_trabajo_lista',
    length: 500,
    comment: 'Enlace al documento del plan de trabajo',
  })
  planTrabajoLista: string;

  @Column('varchar', {
    name: 'color_lista',
    length: 50,
    comment: 'Color de la lista',
  })
  colorLista: string;

  @Column('varchar', {
    name: 'numero_lista',
    length: 3,
    comment: 'Numero de la lista',
  })
  numeroLista: string;

  @Column('varchar', {
    name: 'logo_lista',
    length: 500,
    comment: 'Enlace al archivo del logo',
  })
  logoLista: string;

  @Column({
    name: 'estado_lista',
    type: 'varchar',
    comment: 'Estado de la lista',
  })
  estadoLista: string;


}


