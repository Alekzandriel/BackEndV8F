import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueTypeEnum, CatalogueStateEnum } from '@shared/enums';

@Entity('catalogues', { schema: 'core' })
export class CatalogueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @ManyToOne(() => CatalogueEntity, (category) => category.children)
  parent: CatalogueEntity;

  @OneToMany(() => CatalogueEntity, (category) => category.parent)
  children: CatalogueEntity[];

  @Column('varchar', {
    name: 'code',
    comment: 'Nombre del producto',
  })
  code: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Nombre del producto',
  })
  description: string;

  @Column('boolean', {
    name: 'is_visible',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del producto',
  })
  name: string;

  @Column('enum', {
    name: 'state',
    enum: CatalogueStateEnum,
    comment: 'Nombre del producto',
  })
  state: CatalogueStateEnum;

  @Column('enum', {
    name: 'type',
    enum: CatalogueTypeEnum,
    comment: 'Nombre del producto',
  })
  type: CatalogueTypeEnum;
}
