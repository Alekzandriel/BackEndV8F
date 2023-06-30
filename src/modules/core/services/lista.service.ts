import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { tipoListasService } from '../services/tipo-lista.service';
import { PeriodoLectivoService } from './periodo-lectivo.service';
import { VotoService } from './voto.service';
import { CandidatoService } from './candidato.service';
import { ListaEntity } from '../entities/lista.entity';
import { CandidatoListaService } from './candidato-lista.service';

@Injectable()
export class ListaService {
  constructor(
    @Inject(RepositoryEnum.LISTA_REPOSITORY)
    private listaRepository: Repository<ListaEntity>,
    private candidatosListaService: CandidatoListaService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.listaRepository.findAndCount({
      relations: ['candidatosLista', 'tipoLista', 'votos', 'periodoLectivo'],//
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

  async create(payload: ListaEntity): Promise<ServiceResponseHttpModel> {
    const nuevaLista = this.listaRepository.create(payload);

    nuevaLista.candidatosLista= (await this.candidatosListaService.findOne(payload.candidatosLista.id,)).data;
/*
    nuevoCronograma.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    nuevoVoto.state = await this.cataloguesService.findOne(payload.state.id);

    nuevoVoto.type = await this.cataloguesService.findOne(payload.type.id);*/

    const creacionLista = await this.listaRepository.save(nuevaLista);

    return { data: creacionLista };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.listaRepository.findAndCount({
      relations: ['candidatosLista', 'tipoLista', 'votos', 'periodoLectivo'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const lista = await this.listaRepository.findOne({
      relations: ['candidatosLista','periodoLectivo','tipoLista','votos'],
      where: {
        id,
      },
    });

    if (!lista) {
      throw new NotFoundException(`La lista con el id:  ${id} no se encontro`);
    }
    return { data: lista };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const lista = await this.listaRepository.findOneBy({ id });
    if (!lista) {
      throw new NotFoundException(`La lista con id:  ${id} no se encontro`);
    }
    this.listaRepository.merge(lista, payload);
    const listaActualizada = await this.listaRepository.save(lista);
    return { data: listaActualizada };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const lista = await this.listaRepository.findOneBy({ id });

    if (!lista) {
      throw new NotFoundException(`La lista con el :  ${id} no se encontro`);
    }

    const listaEliminada = await this.listaRepository.softRemove(lista);

    return { data: listaEliminada };
  }

  async removeAll(payload: ListaEntity[]): Promise<ServiceResponseHttpModel> {
    const listasEliminadas = await this.listaRepository.softRemove(payload);
    return { data: listasEliminadas};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ListaEntity>
      | FindOptionsWhere<ListaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreLista: ILike(`%${search}%`) });
      where.push({ esloganLista: ILike(`%${search}%`) });
      where.push({ planTrabajoLista: ILike(`%${search}%`) });
      where.push({ colorLista: ILike(`%${search}%`) });
      where.push({ numeroLista: ILike(`%${search}%`) });
      where.push({ logoLista: ILike(`%${search}%`) });
      where.push({ estadoLista: ILike(`%${search}%`) });
    }

    const response = await this.listaRepository.findAndCount({
      relations: ['candidatosLista','periodoLectivo','tipoLista','votos'],//
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