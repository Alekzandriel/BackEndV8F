import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { TipoUsuarioEntity } from '../entities/tipo-usuario.entity';
import { UsuarioEntity } from '../entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class TipoUsuariosService {
  constructor(
    @Inject(RepositoryEnum.TIPOUSUARIO_REPOSITORY)
    private tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
    private usuariosService: UsuariosService,

  ) { }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tipoUsuarioRepository.findAndCount({
      relations: ['usuario'],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
      data: response[0],
    };
  }

  async create(payload: TipoUsuarioEntity): Promise<ServiceResponseHttpModel> {
    const nuevoTipoUsuario = this.tipoUsuarioRepository.create(payload);

    nuevoTipoUsuario.usuario = (await this.usuariosService.findOne(payload.usuario.id)).data;


    const creacionTipoUsuario = await this.tipoUsuarioRepository.save(nuevoTipoUsuario);

    return { data: creacionTipoUsuario };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.tipoUsuarioRepository.findAndCount({
      relations: ['usuario'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const tipoUsuario = await this.tipoUsuarioRepository.findOne({
      relations: ['usuario'],
      where: {
        id,
      },
    });

    if (!tipoUsuario) {
      throw new NotFoundException(`El usuario con el id:  ${id} no se encontro`);
    }
    return { data: tipoUsuario };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const tipoUsuario = await this.tipoUsuarioRepository.findOneBy({ id });
    if (!tipoUsuario) {
      throw new NotFoundException(`El usuario con id:  ${id} no se encontro`);
    }
    this.tipoUsuarioRepository.merge(tipoUsuario, payload);
    const tiposUsuario = await this.tipoUsuarioRepository.save(tipoUsuario);
    return { data: tipoUsuario };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const tipoUsuario = await this.tipoUsuarioRepository.findOneBy({ id });

    if (!tipoUsuario) {
      throw new NotFoundException(`El tipo Usuario con el :  ${id} no se encontro`);
    }

    const usuarioELiminado = await this.tipoUsuarioRepository.softRemove(tipoUsuario);

    return { data: usuarioELiminado };
  }

  async removeAll(payload: TipoUsuarioEntity[]): Promise<ServiceResponseHttpModel> {
    const usuariosEliminados = await this.tipoUsuarioRepository.softRemove(payload);
    return { data: usuariosEliminados };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TipoUsuarioEntity>
      | FindOptionsWhere<TipoUsuarioEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreTipoUsuario: ILike(`%${search}%`) });

    }

    const response = await this.tipoUsuarioRepository.findAndCount({
      relations: ['usuario'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}