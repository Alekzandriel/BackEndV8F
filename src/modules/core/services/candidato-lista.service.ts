import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CandidatoListaEntity } from '../entities/candidato-lista.entity';
import { UsuariosService } from 'src/modules/auth/services/usuarios.service';
import { ListaService } from './lista.service';
import { CargoService } from './cargo.service';
import { CandidatoService } from './candidato.service';


@Injectable()
export class CandidatoListaService {
  constructor(
    @Inject(RepositoryEnum.CANDIDATOLISTA_REPOSITORY)
    private candidatoListaRepository: Repository<CandidatoListaEntity>,
    //private candidatoService: CandidatoService
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.candidatoListaRepository.findAndCount({
      relations: ['usuarios', 'lista', 'cargos', 'candidato'],
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

  async create(payload: CandidatoListaEntity): Promise<ServiceResponseHttpModel> {//T ANY CAMBIAR POR NOMBRE DE LA ENTIDAD create y update
    const nuevoCandidato = this.candidatoListaRepository.create(payload);

   //nuevoCandidato.candidatosLista = (await this.candidatoListaService.findOne( payload.candidatosLista.id)).data;//entre parentesis desde await hasta el final y add .data y add variable.foreingKeyName y this.nombreServicio

    const creacionCandidato = await this.candidatoListaRepository.save(nuevoCandidato);

    return { data: creacionCandidato }; //nombreForeignKey : data
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> { //any: nombreEntidad
    //Pagination & Filter by search



    //Filter by other field

    //All
    const data = await this.candidatoListaRepository.findAndCount({
      relations: ['usuarios', 'lista', 'cargos', 'candidato'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const candidato = await this.candidatoListaRepository.findOne({
      relations: ['usuarios', 'lista', 'cargos', 'candidato'],
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
    payload: CandidatoListaEntity,
  ): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoListaRepository.findOneBy({ id }); //
    if (!candidato) {
      throw new NotFoundException(`El candidato de la lista con id:  ${id} no se encontro`);
    }
    this.candidatoListaRepository.merge(candidato, payload);
    const candidatoActualizado = await this.candidatoListaRepository.save(candidato);
    return { data: candidatoActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoListaRepository.findOneBy({ id });

    if (!candidato) {
      throw new NotFoundException(`El candidato de la lista con el :  ${id} no se encontro`);
    }

    const candidatoELiminado = await this.candidatoListaRepository.softRemove(candidato);

    return { data: candidatoELiminado };
  }

  async removeAll(payload: any[]): Promise<ServiceResponseHttpModel> {
    const candidatosEliminados = await this.candidatoListaRepository.softRemove(payload);
    return { data: candidatosEliminados};
  }//PREGUNTAR

  private async paginateAndFilter(params: any,): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CandidatoListaEntity>
      | FindOptionsWhere<CandidatoListaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      //where.push({ dignidadCandidato: ILike(`%${search}%`) });
      //where.push({ matriculaCandidato: ILike(`%${search}%`) });
    }

    const response = await this.candidatoListaRepository.findAndCount({
      relations: ['usuarios', 'lista', 'cargos', 'candidato'],
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