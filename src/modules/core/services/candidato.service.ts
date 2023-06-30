import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CandidatoEntity } from '../entities/candidato.entity';
import { CandidatoListaService } from './candidato-lista.service';


@Injectable()
export class CandidatoService {
  constructor(
    @Inject(RepositoryEnum.CANDIDATO_REPOSITORY)
    private candidatoRepository: Repository<CandidatoEntity>,
    private candidatoListaService:CandidatoListaService
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.candidatoRepository.findAndCount({
      relations: ['candidatosLista'],
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

  async create(payload: CandidatoEntity): Promise<ServiceResponseHttpModel> {//T ANY CAMBIAR POR NOMBRE DE LA ENTIDAD create y update
    const nuevoCandidato = this.candidatoRepository.create(payload);

   //nuevoCandidato.candidatosLista = (await this.candidatoListaService.findOne( payload.candidatosLista.id)).data;//entre parentesis desde await hasta el final y add .data y add variable.foreingKeyName y this.nombreServicio

    const creacionCandidato = await this.candidatoRepository.save(nuevoCandidato);

    return { data: creacionCandidato }; //nombreForeignKey : data
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> { //any: nombreEntidad
    //Pagination & Filter by search



    //Filter by other field

    //All
    const data = await this.candidatoRepository.findAndCount({
      relations: ['candidatosLista'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const candidato = await this.candidatoRepository.findOne({
      relations: ['candidatosLista'],
      where: {
        id,
      },
    });

    if (!candidato) {
      throw new NotFoundException(`El candidato de la lista con el id:  ${id} no se encontro`);
    }
    return { data: candidato };
  }

  async update(
    id: string,
    payload: CandidatoEntity,
  ): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoRepository.findOneBy({ id }); //
    if (!candidato) {
      throw new NotFoundException(`El candidato de la lista con id:  ${id} no se encontro`);
    }
    this.candidatoRepository.merge(candidato, payload);
    const candidatoActualizado = await this.candidatoRepository.save(candidato);
    return { data: candidatoActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoRepository.findOneBy({ id });

    if (!candidato) {
      throw new NotFoundException(`El candidato de la lista con el :  ${id} no se encontro`);
    }

    const candidatoELiminado = await this.candidatoRepository.softRemove(candidato);

    return { data: candidatoELiminado };
  }

  async removeAll(payload: any[]): Promise<ServiceResponseHttpModel> {
    const candidatosEliminados = await this.candidatoRepository.softRemove(payload);
    return { data: candidatosEliminados};
  }//PREGUNTAR

  private async paginateAndFilter(params: any,): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CandidatoEntity>
      | FindOptionsWhere<CandidatoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ dignidadCandidato: ILike(`%${search}%`) });
      where.push({ matriculaCandidato: ILike(`%${search}%`) });
    }

    const response = await this.candidatoRepository.findAndCount({
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