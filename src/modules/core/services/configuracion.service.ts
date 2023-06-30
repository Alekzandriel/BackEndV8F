import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { ConfiguracionEntity } from '../entities/configuracion.entity';

@Injectable()
export class ConfiguracionService {
  constructor(
    @Inject(RepositoryEnum.CONFIGURACION_REPOSITORY)
    private configuracionRepository: Repository<ConfiguracionEntity>,
    /*private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.configuracionRepository.findAndCount({
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
    const nuevaConfiguracion = this.configuracionRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    const creacionConfiguracion = await this.configuracionRepository.save(nuevaConfiguracion);

    return { data: creacionConfiguracion };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.configuracionRepository.findAndCount({
      relations: [''],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const configuracion = await this.configuracionRepository.findOne({
      relations: [''],
      where: {
        id,
      },
    });

    if (!configuracion) {
      throw new NotFoundException(`La configuración con el id:  ${id} no se encontro`);
    }
    return { data: configuracion };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const configuracion = await this.configuracionRepository.findOneBy({ id });
    if (!configuracion) {
      throw new NotFoundException(`La configuración con id:  ${id} no se encontro`);
    }
    this.configuracionRepository.merge(configuracion, payload);
    const configuracionActualizada = await this.configuracionRepository.save(configuracion);
    return { data: configuracionActualizada};
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const configuracion = await this.configuracionRepository.findOneBy({ id });

    if (!configuracion) {
      throw new NotFoundException(`La configuración con el :  ${id} no se encontro`);
    }

    const configuracionEliminada = await this.configuracionRepository.softRemove(configuracion);

    return { data: configuracionEliminada };
  }

  async removeAll(payload: ConfiguracionEntity[]): Promise<ServiceResponseHttpModel> {
    const configuracionesEliminadas = await this.configuracionRepository.softRemove(payload);
    return { data: configuracionesEliminadas};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ConfiguracionEntity>
      | FindOptionsWhere<ConfiguracionEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({codigoReseteoClave: ILike(`%${search}%`) });
      where.push({ fechaCodigoReseteoClave: ILike(`%${search}%`) });
      where.push({ duracionCodigoReseteoClave: ILike(`%${search}%`) });
      where.push({ fechaVencimientoCodigoReseteo: ILike(`%${search}%`) });
    }

    const response = await this.configuracionRepository.findAndCount({
      relations: [],
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
