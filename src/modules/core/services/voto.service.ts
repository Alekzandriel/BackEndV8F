import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { VotoEntity } from '../entities/voto.entity';
import { ListaService } from './lista.service';

@Injectable()
export class VotoService {
  constructor(
    @Inject(RepositoryEnum.VOTO_REPOSITORY)
    private votoRepository: Repository<VotoEntity>,
    private listaService:ListaService 
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.votoRepository.findAndCount({
      relations: ['lista'],
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

  async create(payload: VotoEntity): Promise<ServiceResponseHttpModel> {
    const nuevoVoto = this.votoRepository.create(payload);

    nuevoVoto.lista = (await this.listaService.findOne(payload.lista.id)).data;

    const creacionVoto = await this.votoRepository.save(nuevoVoto);

    return { data: creacionVoto };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.votoRepository.findAndCount({
      relations: ['lista'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const voto = await this.votoRepository.findOne({
      relations: ['lista'],
      where: {
        id,
      },
    });

    if (!voto) {
      throw new NotFoundException(`El voto con el id:  ${id} no se encontro`);
    }
    return { data: voto };
  }

  async update(
    id: string,
    payload: VotoEntity,
  ): Promise<ServiceResponseHttpModel> {
    const voto = await this.votoRepository.findOneBy({ id });
    if (!voto) {
      throw new NotFoundException(`El voto con id:  ${id} no se encontro`);
    }
    this.votoRepository.merge(voto, payload);
    const votoActualizado = await this.votoRepository.save(voto);
    return { data: votoActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const voto = await this.votoRepository.findOneBy({ id });

    if (!voto) {
      throw new NotFoundException(`El voto con el :  ${id} no se encontro`);
    }

    const votoELiminado = await this.votoRepository.softRemove(voto);

    return { data: votoELiminado };
  }

  async removeAll(payload: VotoEntity[]): Promise<ServiceResponseHttpModel> {
    const votosEliminados = await this.votoRepository.softRemove(payload);
    return { data: votosEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<VotoEntity>
      | FindOptionsWhere<VotoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ horaVoto: ILike(`%${search}%`) });
      where.push({ claseVoto: ILike(`%${search}%`) });
    }

    const response = await this.votoRepository.findAndCount({
      relations: ['lista'],
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