  import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CronogramaEntity } from '../entities/cronograma.entity';
import { DetalleCronogramaService } from './detalle-cronograma.service';

@Injectable()
export class CronogramaService {
  constructor(
    @Inject(RepositoryEnum.CRONOGRAMA_REPOSITORY)
    private cronogramaRepository: Repository<CronogramaEntity>,
    /*private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.cronogramaRepository.findAndCount({
      relations: ['cronogramas'],
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

  async create(payload: CronogramaEntity): Promise<ServiceResponseHttpModel> {
    const nuevoCronograma = this.cronogramaRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );
/*
    nuevoCronograma.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    nuevoVoto.state = await this.cataloguesService.findOne(payload.state.id);

    nuevoVoto.type = await this.cataloguesService.findOne(payload.type.id);*/

    const creacionCronograma = await this.cronogramaRepository.save(nuevoCronograma);

    return { data: creacionCronograma };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.cronogramaRepository.findAndCount({
      relations: ['cCronograms'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const cronograma = await this.cronogramaRepository.findOne({
      relations: ['cronogramas'],
      where: {
        id,
      },
    });

    if (!cronograma) {
      throw new NotFoundException(`El cronograma con el id:  ${id} no se encontro`);
    }
    return { data: cronograma };
  }

  async update(
    id: string,
    payload: CronogramaEntity,
  ): Promise<ServiceResponseHttpModel> {
    const cronograma = await this.cronogramaRepository.findOneBy({ id });
    if (!cronograma) {
      throw new NotFoundException(`El cronograma con id:  ${id} no se encontro`);
    }
    this.cronogramaRepository.merge(cronograma, payload);
    const cronogramaActualizado = await this.cronogramaRepository.save(cronograma);
    return { data: cronogramaActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const cronograma = await this.cronogramaRepository.findOneBy({ id });

    if (!cronograma) {
      throw new NotFoundException(`El cronograma con el :  ${id} no se encontro`);
    }

    const cronogramaELiminado = await this.cronogramaRepository.softRemove(cronograma);

    return { data: cronogramaELiminado };
  }

  async removeAll(payload: CronogramaEntity[]): Promise<ServiceResponseHttpModel> {
    const cronogramasEliminados = await this.cronogramaRepository.softRemove(payload);
    return { data: cronogramasEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CronogramaEntity>
      | FindOptionsWhere<CronogramaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ periodoLectivo: ILike(`%${search}%`) });
      where.push({ fechaCreacionCronograma: ILike(`%${search}%`) });
      where.push({ responsableCronograma: ILike(`%${search}%`) });
    }

    const response = await this.cronogramaRepository.findAndCount({
      relations: ['cronogramas'],
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