import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { TareaEntity } from '../entities/tarea.entity';

@Injectable()
export class TareaService {
  constructor(
    @Inject(RepositoryEnum.TAREA_REPOSITORY)
    private tareaRepository: Repository<TareaEntity>,
    /*private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tareaRepository.findAndCount({
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
    const nuevaTarea = this.tareaRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );
/*
    nuevoCronograma.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    nuevoVoto.state = await this.cataloguesService.findOne(payload.state.id);

    nuevoVoto.type = await this.cataloguesService.findOne(payload.type.id);*/

    const creacionTarea = await this.tareaRepository.save(nuevaTarea);

    return { data: creacionTarea };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.tareaRepository.findAndCount({
      relations: [''],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const tarea = await this.tareaRepository.findOne({
      relations: [''],
      where: {
        id,
      },
    });

    if (!tarea) {
      throw new NotFoundException(`La tarea con el id:  ${id} no se encontro`);
    }
    return { data: tarea };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const tarea = await this.tareaRepository.findOneBy({ id });
    if (!tarea) {
      throw new NotFoundException(`La tarea con el id:  ${id} no se encontro`);
    }
    this.tareaRepository.merge(tarea, payload);
    const tareaActualizada = await this.tareaRepository.save(tarea);
    return { data: tareaActualizada };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const tarea = await this.tareaRepository.findOneBy({ id });

    if (!tarea) {
      throw new NotFoundException(`La tarea con el  :  ${id} no se encontro`);
    }

    const tareaEliminada = await this.tareaRepository.softRemove(tarea);

    return { data: tareaEliminada };
  }

  async removeAll(payload: TareaEntity[]): Promise<ServiceResponseHttpModel> {
    const tareasEliminadas = await this.tareaRepository.softRemove(payload);
    return { data: tareasEliminadas};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TareaEntity>
      | FindOptionsWhere<TareaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreTarea: ILike(`%${search}%`) });
    }

    const response = await this.tareaRepository.findAndCount({
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