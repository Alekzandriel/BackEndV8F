import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoUsuarioEntity } from './tipo-usuario.entity';
import { CandidatoListaEntity, CarreraEntity } from '@core/entities';
import { RolEntity } from './rol.entity';

@Entity('usuarios', { schema: 'auth' })
export class UsuarioEntity {
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

  @ManyToOne(() => TipoUsuarioEntity)
  @JoinColumn({ name: 'idtipousuario' })
  tipoUsuario: TipoUsuarioEntity;

  @ManyToOne(() => CandidatoListaEntity)
  @JoinColumn({ name: 'idcandidatoslista' })
  candidatosLista: CandidatoListaEntity;

  @ManyToOne(() => CarreraEntity)
  @JoinColumn({ name: 'idcarrera' })
  carrera: CarreraEntity;

  @ManyToMany(()=>RolEntity)
  @JoinTable({name:'rol_usuario'})
  roles:RolEntity[];


  @Column('varchar', {
    name: 'cedula',
    length: 10,
    nullable: true,
    unique: true,
    comment: 'Cedula del usuario',
  })
  cedula: string;

  @Column('varchar', {
    name: 'nombre_usuario',
    nullable: true,
    length: 50,
    comment: 'Nombre del usuario',
  })
  nombreUsuario: string;

  @Column('varchar', {
    name: 'apellido_usuario',
    nullable: true,
    length: 50,
    comment: 'Apellido del usuario',
  })
  apellidoUsuario: string;

  @Column('varchar', {
    name: 'semestre',
    nullable: true,
    length: 50,
    comment: 'Semestre actual del usuario',
  })
  semestre: string;

  @Column('varchar', {
    name: 'correo',
    nullable: true,
    length: 50,
    comment: 'Correo electronico del usuario',
  })
  correo: string;

  @Column('varchar', {
    name: 'tipo_usuario',
    nullable: true,
    length: 50,
    comment: 'tipo del usuario Ej. votante',
  })
  tiposUsuario: string;

  @Column('varchar', {
    name: 'clave_usuario',
    nullable: true,
    length: 50,
    comment: 'Clave del usuario', /*PREGUNTAR CLAVE*/
  })
  claveUsuario: string;

  @Column('varchar', {
    name: 'periodo_ultimo_voto',
    nullable: true,
    length: 50,
    comment: 'Ultimo periodo de voto del usuario',
  })
  periodoUltimoVoto: string;

  @Column({
    name: 'estado_voto',
    type: 'varchar',
    comment: 'Estado del voto del usuario Ej. No Voto = False',
  })
  estadoVoto: string;

  @Column({
    name: 'estado_usuario',
    type: 'varchar',
    comment: 'Estado del usuario. Ej. Activo = True',
  })
  estadoUsuario: string;

}
