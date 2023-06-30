import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { InformationStudentEntity } from '@core/entities';
import { PaginationDto} from '@core/dto';
import { CataloguesService } from './catalogues.service';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class InformationStudentsService {
  create: any;
  constructor(
    @Inject(RepositoryEnum.INFORMATION_STUDENT_REPOSITORY)
    private informationStudentRepository: Repository<InformationStudentEntity>,
    private cataloguesService: CataloguesService,
  ) {}
/*
  async create(
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const newInformationStudent =
      this.informationStudentRepository.create(payload);

    this.informationStudentRepository.create(payload);

    newInformationStudent.isExecutedPractice =
      await this.cataloguesService.findOne(payload.isExecutedPractice.id);

    newInformationStudent.isExecutedCommunity =
      await this.cataloguesService.findOne(payload.isExecutedCommunity.id);

    newInformationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    newInformationStudent.isLostGratuity = await this.cataloguesService.findOne(
      payload.isLostGratuity.id,
    );

    newInformationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    newInformationStudent.isSubjectRepeat =
      await this.cataloguesService.findOne(payload.isSubjectRepeat.id);

    const informationStudentCreated =
      await this.informationStudentRepository.save(newInformationStudent);

    return { data: informationStudentCreated };
  }
*/
  async findAll(
    params?: any,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.community) {
      return this.filterByCommunity(params.community);
    }

    //All
    const data = await this.informationStudentRepository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const informationStudent = await this.informationStudentRepository.findOne({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
      where: { id },
    });

    if (informationStudent === null) {
      throw new NotFoundException('La informacion no se encontro');
    }

    return { data: informationStudent };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const informationStudent =
      await this.informationStudentRepository.findOneBy({ id });

    if (informationStudent === null) {
      throw new NotFoundException(
        'La informacion del estudiante no se encontro',
      );
    }
    informationStudent.isExecutedPractice =
      await this.cataloguesService.findOne(payload.isExecutedPractice.id);

    informationStudent.isExecutedCommunity =
      await this.cataloguesService.findOne(payload.isExecutedCommunity.id);

    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    informationStudent.isLostGratuity = await this.cataloguesService.findOne(
      payload.isLostGratuity.id,
    );

    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    informationStudent.isSubjectRepeat = await this.cataloguesService.findOne(
      payload.isSubjectRepeat.id,
    );

    this.informationStudentRepository.merge(informationStudent, payload);
    const informationStudentUpdated =
      await this.informationStudentRepository.save(informationStudent);

    return { data: informationStudentUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const informationStudent =
      await this.informationStudentRepository.findOneBy({ id });

    if (!informationStudent) {
      throw new NotFoundException('Information Student not found');
    }

    const informationStudentDeleted =
      await this.informationStudentRepository.save(informationStudent);

    return { data: informationStudentDeleted };
  }

  async removeAll(
    payload: InformationStudentEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const informationStudentsDeleted =
      await this.informationStudentRepository.softRemove(payload);

    return { data: informationStudentsDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<InformationStudentEntity>
      | FindOptionsWhere<InformationStudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ address: ILike(`%${search}%`) });
      where.push({ contactEmergencyName: ILike(`%${search}%`) });
      where.push({ contactEmergencyKinship: ILike(`%${search}%`) });
      where.push({ contactEmergencyPhone: ILike(`%${search}%`) });
      where.push({ postalCode: ILike(`%${search}%`) });
    }

    const response = await this.informationStudentRepository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByCommunity(
    community: number,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<InformationStudentEntity> = {};

    if (community) {
      where.community = LessThan(community);
    }

    const response = await this.informationStudentRepository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
