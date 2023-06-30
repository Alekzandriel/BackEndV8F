import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CarreraEntity } from '../entities/carrera.entity';
import { UsuariosService } from 'src/modules/auth/services/usuarios.service';

@Injectable()
export class CarreraService {
  constructor(
    @Inject(RepositoryEnum.CARRERA_REPOSITORY)
    private carreraRepository: Repository<CarreraEntity>,
    /*private usuariosService: UsuariosService,*/
    /*private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.carreraRepository.findAndCount({
      relations: ['usuarios'],
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
    const nuevaCarrera = this.carreraRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    const creacionCarrera = await this.carreraRepository.save(nuevaCarrera);

    return { data: creacionCarrera };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.carreraRepository.findAndCount({
      relations: ['usuario'],//
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const carrera = await this.carreraRepository.findOne({
      relations: ['usuarios'],
      where: {
        id,
      },
    });

    if (!carrera) {
      throw new NotFoundException(`La carrera con el id:  ${id} no se encontro`);
    }
    return { data: carrera };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const carrera = await this.carreraRepository.findOneBy({ id });
    if (!carrera) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.carreraRepository.merge(carrera, payload);
    const carreraActualizada = await this.carreraRepository.save(carrera);
    return { data: carreraActualizada };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const carrera = await this.carreraRepository.findOneBy({ id });

    if (!carrera) {
      throw new NotFoundException(`El voto con el :  ${id} no se encontro`);
    }

    const carreraEliminada = await this.carreraRepository.softRemove(carrera);

    return { data: carreraEliminada };
  }

  async removeAll(payload: CarreraEntity[]): Promise<ServiceResponseHttpModel> {
    const carrerasEliminadas = await this.carreraRepository.softRemove(payload);
    return { data: carrerasEliminadas};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CarreraEntity>
      | FindOptionsWhere<CarreraEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreCarrera: ILike(`%${search}%`) });
      where.push({ estado: ILike(`%${search}%`) });
    }

    const response = await this.carreraRepository.findAndCount({
      relations: ['usuarios'],
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