import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PeriodoLectivoEntity } from '../entities/periodo-lectivo.entity';
import { ListaService } from './lista.service';
import { DetalleCronogramaService } from './detalle-cronograma.service';

@Injectable()
export class PeriodoLectivoService {
  constructor(
    @Inject(RepositoryEnum.PERIODOLECTIVO_REPOSITORY)
    private periodoLectivoRepository: Repository<PeriodoLectivoEntity>,
    private listaService: ListaService,
    private detalleCronogramaService: DetalleCronogramaService
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.periodoLectivoRepository.findAndCount({
      relations: ['lista','detalleCronograma'],
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

  async create(payload: PeriodoLectivoEntity): Promise<ServiceResponseHttpModel> {
    const nuevoPeriodoLectivo = this.periodoLectivoRepository.create(payload);

    nuevoPeriodoLectivo.lista = (await this.listaService.findOne(payload.lista.id,)).data;

    nuevoPeriodoLectivo.detalleCronograma = (await this.detalleCronogramaService.findOne(payload.detalleCronograma.id,)).data;
/*
    nuevoVoto.state = await this.cataloguesService.findOne(payload.state.id);

    nuevoVoto.type = await this.cataloguesService.findOne(payload.type.id);*/

    const creacionPeriodoLectivo = await this.periodoLectivoRepository.save(nuevoPeriodoLectivo);

    return { data: creacionPeriodoLectivo };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.periodoLectivoRepository.findAndCount({
      relations: ['lista','detalleCronograma'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const periodoLectivo = await this.periodoLectivoRepository.findOne({
      relations: ['lista','detalleCronograma'],
      where: {
        id,
      },
    });

    if (!periodoLectivo) {
      throw new NotFoundException(`El periodoLectivo con el id:  ${id} no se encontro`);
    }
    return { data: periodoLectivo };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const periodoLectivo = await this.periodoLectivoRepository.findOneBy({ id });
    if (!periodoLectivo) {
      throw new NotFoundException(`El periodoLectivo con id:  ${id} no se encontro`);
    }
    this.periodoLectivoRepository.merge(periodoLectivo, payload);
    const periodoLectivoActualizado = await this.periodoLectivoRepository.save(periodoLectivo);
    return { data: periodoLectivoActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const periodoLectivo = await this.periodoLectivoRepository.findOneBy({ id });

    if (!periodoLectivo) {
      throw new NotFoundException(`El periodoLectivo con el :  ${id} no se encontro`);
    }

    const periodoLectivoEliminado = await this.periodoLectivoRepository.softRemove(periodoLectivo);

    return { data: periodoLectivoEliminado };
  }

  async removeAll(payload: PeriodoLectivoEntity[]): Promise<ServiceResponseHttpModel> {
    const periodosLectivosEliminados = await this.periodoLectivoRepository.softRemove(payload);
    return { data: periodosLectivosEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<PeriodoLectivoEntity>
      | FindOptionsWhere<PeriodoLectivoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombrePeriodoLectivo: ILike(`%${search}%`) });
      where.push({ fechaInicioPeriodoLectivo: ILike(`%${search}%`) });
      where.push({ fechaFinalizacionPeriodoLectivo: ILike(`%${search}%`) });
    }

    const response = await this.periodoLectivoRepository.findAndCount({
      relations: ['lista','detalleCronograma'],
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