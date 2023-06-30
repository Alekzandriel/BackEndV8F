import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { RolEntity } from '../entities/rol.entity';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class RolService {
  constructor(
    @Inject(RepositoryEnum.ROL_REPOSITORY)
    private rolRepository: Repository<RolEntity>,
    /*private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService*/
    
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.rolRepository.findAndCount({
      relations: [''],
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

  async create(payload: any): Promise<ServiceResponseHttpModel> {
    const nuevoRol = this.rolRepository.create(payload);

     //nuevoRol. = (await this.institutionService.findOne( payload.institution.id)).data;

    const creacionRol = await this.rolRepository.save(nuevoRol);

    return { data: creacionRol };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.rolRepository.findAndCount({
      relations: [''],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const rol = await this.rolRepository.findOne({
      relations: [''],
      where: {
        id,
      },
    });

    if (!rol) {
      throw new NotFoundException(`El rol con el id:  ${id} no se encontro`);
    }
    return { data: rol };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const rol = await this.rolRepository.findOneBy({ id });
    if (!rol) {
      throw new NotFoundException(`El rol con id:  ${id} no se encontro`);
    }
    this.rolRepository.merge(rol, payload);
    const votoUsuario = await this.rolRepository.save(rol);
    return { data: votoUsuario };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException(`El rol con el :  ${id} no se encontro`);
    }

    const usuarioELiminado = await this.rolRepository.softRemove(rol);

    return { data: usuarioELiminado };
  }

  async removeAll(payload: RolEntity[]): Promise<ServiceResponseHttpModel> {
    const usuariosEliminados = await this.rolRepository.softRemove(payload);
    return { data: usuariosEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RolEntity>
      | FindOptionsWhere<RolEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreRol: ILike(`%${search}%`) });
    
    }

    const response = await this.rolRepository.findAndCount({
      relations: [''],
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