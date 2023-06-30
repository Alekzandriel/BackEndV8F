import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CargoEntity } from '../entities/cargo.entity';
import { CandidatoListaService } from './candidato-lista.service';

@Injectable()
export class CargoService {
  constructor(
    @Inject(RepositoryEnum.CARGO_REPOSITORY)
    private cargoRepository: Repository<CargoEntity>,
    
    /*private cataloguesService: CataloguesService*/
    private candidatoListaService: CandidatoListaService
  ) { }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.cargoRepository.findAndCount({
      relations: ['candidatoslista'],
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

  async create(payload: CargoEntity): Promise<ServiceResponseHttpModel> {
    const nuevoCargo = this.cargoRepository.create(payload);

    nuevoCargo.candidatosLista = (await this.candidatoListaService.findOne(payload.candidatosLista.id)).data;



    const creacionCargo = await this.cargoRepository.save(nuevoCargo);

    return { data: creacionCargo };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.cargoRepository.findAndCount({
      relations: ['candidatosLista'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const cargo = await this.cargoRepository.findOne({
      relations: ['candidatosLista'],
      where: {
        id,
      },
    });

    if (!cargo) {
      throw new NotFoundException(`El cargo con el id:  ${id} no se encontro`);
    }
    return { data: cargo };
  }

  async update(
    id: string,
    payload: CargoEntity,
  ): Promise<ServiceResponseHttpModel> {
    const cargo = await this.cargoRepository.findOneBy({ id });
    if (!cargo) {
      throw new NotFoundException(`El cargo con id:  ${id} no se encontro`);
    }
    this.cargoRepository.merge(cargo, payload);
    const cargoActualizado = await this.cargoRepository.save(cargo);
    return { data: cargoActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const cargo = await this.cargoRepository.findOneBy({ id });

    if (!cargo) {
      throw new NotFoundException(`El cargo con el :  ${id} no se encontro`);
    }

    const cargoELiminado = await this.cargoRepository.softRemove(cargo);

    return { data: cargoELiminado };
  }

  async removeAll(payload: CargoEntity[]): Promise<ServiceResponseHttpModel> {
    const cargosEliminados = await this.cargoRepository.softRemove(payload);
    return { data: cargosEliminados };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CargoEntity>
      | FindOptionsWhere<CargoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

    }

    const response = await this.cargoRepository.findAndCount({
      relations: ['candidatosLista'],
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