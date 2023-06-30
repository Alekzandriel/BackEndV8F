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
import { UsuarioEntity } from './usuario.entity';

@Entity('tipoUsuarios', { schema: 'auth' })
export class TipoUsuarioEntity {
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

  @OneToMany(() => UsuarioEntity, (usuario: UsuarioEntity) => usuario.tipoUsuario)
  @JoinColumn({ name: 'cedulausuario' })
  usuario: UsuarioEntity;

  @Column('varchar', {
    name: 'nombre_tipo_usuario',
    length: 50,
    nullable: true,
    unique: true,
    comment: 'Nombre del tipo de usuario. Ej. Docente',
  })
  nombreTipoUsuario: string;


}
