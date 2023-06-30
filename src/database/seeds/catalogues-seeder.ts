import { Injectable } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';
import { CreateCatalogueDto } from '@core/dto';

@Injectable()
export class CataloguesSeeder {
  constructor(private catalogueService: CataloguesService) {}

  async run() {
    await this.createAcademicPeriodCatalogues();
    await this.createBloodTypeCatalogues();
    await this.createCareerModalityCatalogues();
    await this.createDisabilityTypeCatalogues();
    await this.createEducationLevelCatalogues();
    await this.createEthnicOriginCatalogues();
    await this.createIdentificationTypeCatalogues();
    await this.createInstitutionPracticesTypeCatalogues();
    await this.createGenderCatalogues();
    await this.createMaritalStatusCatalogues();
    await this.createProjectScopeCatalogues();
    await this.createRegistrationTypeCatalogues();
    await this.createScholarshipReason1Catalogues();
    await this.createScholarshipReason2Catalogues();
    await this.createScholarshipReason3Catalogues();
    await this.createScholarshipReason4Catalogues();
    await this.createScholarshipReason5Catalogues();
    await this.createScholarshipReason6Catalogues();
    await this.createScholarshipTypeCatalogues();
    await this.createScholarshipFundingTypeCatalogues();
    await this.createSchoolDayCatalogues();
    await this.createSchoolTypeCatalogues();
    await this.createSexCatalogues();
    await this.createStudentIncomeForCatalogues();
    await this.createStudentOccupationCatalogues();
    await this.createYesNoCatalogues();
    await this.createYesNoNACatalogues();
  }

  async createAcademicPeriodCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Periodo academico',
      name: '1ro',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '2',
      description: 'Periodo academico',
      name: '1do',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '3',
      description: 'Periodo academico',
      name: '3ro',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '4',
      description: 'Periodo academico',
      name: '4to',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '5',
      description: 'Periodo academico',
      name: '5to',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ACADEMIC_PERIOD,
    });
    catalogues.push({
      code: '6',
      description: 'Periodo academico',
      name: '6to',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ACADEMIC_PERIOD,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createBloodTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de sangre',
      name: 'A+',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de sangre',
      name: 'A-',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de sangre',
      name: 'B+',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de sangre',
      name: 'B-',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de sangre',
      name: 'AB+',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '6',
      description: 'tipo de sangre',
      name: 'AB-',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '7',
      description: 'tipo de sangre',
      name: 'O+',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });
    catalogues.push({
      code: '8',
      description: 'tipo de sangre',
      name: 'O-',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.BLOOD_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createCareerModalityCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Modalidad de carrera',
      name: 'Presencial',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: '2',
      description: 'Modalidad de carrera',
      name: 'Semi-Presencial',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: '3',
      description: 'Modalidad de carrera',
      name: 'Disntacia',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: '4',
      description: 'Modalidad de carrera',
      name: 'Dual',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: '5',
      description: 'Modalidad de carrera',
      name: 'Línea',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.CAREER_MODALITY,
    });
    catalogues.push({
      code: '6',
      description: 'Modalidad de carrera',
      name: 'Híbrida',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.CAREER_MODALITY,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createDisabilityTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de discapacidad',
      name: 'Intelectual',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de discapacidad',
      name: 'Física',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de discapacidad',
      name: 'Visual',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de discapacidad',
      name: 'Auditiva',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de discapacidad',
      name: 'Mental',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '6',
      description: 'tipo de discapacidad',
      name: 'Otra',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });
    catalogues.push({
      code: '7',
      description: 'tipo de discapacidad',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.DISABILITY_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEducationLevelCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Nivel de formación',
      name: 'Centro de Alfabetización',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '2',
      description: 'Nivel de formación',
      name: 'Jardín de infantes',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '3',
      description: 'Nivel de formación',
      name: 'Primaria',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '4',
      description: 'Nivel de formación',
      name: 'Educación Básica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '5',
      description: 'Nivel de formación',
      name: 'Secundaria',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '6',
      description: 'Nivel de formación',
      name: 'Educación Media',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '7',
      description: 'Nivel de formación',
      name: 'Superior no Universitaria',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '8',
      description: 'Nivel de formación',
      name: 'Superior Universitaria',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '9',
      description: 'Nivel de formación',
      name: 'Posgrado',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });
    catalogues.push({
      code: '10',
      description: 'Nivel de formación',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.EDUCATION_LEVEL,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createEthnicOriginCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'etnia',
      name: 'Indígena',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de sangre',
      name: 'Afroecuatoriano',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de sangre',
      name: 'Negro',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de sangre',
      name: 'Mulato',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de sangre',
      name: 'Montuvio',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '6',
      description: 'tipo de sangre',
      name: 'Mestizo',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '7',
      description: 'tipo de sangre',
      name: 'Blanco',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '8',
      description: 'tipo de sangre',
      name: 'Otro',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });
    catalogues.push({
      code: '9',
      description: 'tipo de sangre',
      name: 'No registra',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.ETHNIC_ORIGIN,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createIdentificationTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de identificacion',
      name: 'Cédula',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.IDENTIFICATION_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de identificacion',
      name: 'Pasaporte',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.IDENTIFICATION_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createInstitutionPracticesTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'tipo de institucion practicas',
      name: 'Pública',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de institucion practicas',
      name: 'Privada',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'tipo de institucion practicas',
      name: 'ONG',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'tipo de institucion practicas',
      name: 'Otro',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'tipo de institucion practicas',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.INSTITUTION_PRACTICES_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createGenderCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'genero',
      name: 'Masculino',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.GENDER,
    });
    catalogues.push({
      code: '2',
      description: 'tipo de identificacion',
      name: 'Femenino',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.GENDER,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createMaritalStatusCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'estado civil',
      name: 'Soltero/a',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '2',
      description: 'estado civil',
      name: 'Casado/a',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '3',
      description: 'estado civil',
      name: 'Divorciado/a',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '4',
      description: 'estado civil',
      name: 'Unión libre',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.MARITAL_STATUS,
    });
    catalogues.push({
      code: '5',
      description: 'estado civil',
      name: 'Viudo/a',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.MARITAL_STATUS,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createProjectScopeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Nacional',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '2',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Provincial',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '3',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Cantonal',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '4',
      description: 'Alcance del proyecto de vinculacion',
      name: 'Parrolquial',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.PROJECT_SCOPE,
    });
    catalogues.push({
      code: '5',
      description: 'Alcance del proyecto de vinculacion',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.PROJECT_SCOPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createRegistrationTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de matricula',
      name: 'Ordinaria',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.REGISTRATION_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de matricula',
      name: 'Extraordinaria',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.REGISTRATION_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de matricula',
      name: 'Especial',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.REGISTRATION_TYPE,
    });
    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason1Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Primera razón de la beca',
      name: 'Socioeconómica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_1,
    });
    catalogues.push({
      code: '2',
      description: 'Primera razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_1,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason2Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Segunda razón de la beca',
      name: 'Excelencia Académica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_2,
    });
    catalogues.push({
      code: '2',
      description: 'Segunda razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_2,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason3Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tercera razón de la beca',
      name: 'Deportista',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_3,
    });
    catalogues.push({
      code: '2',
      description: 'Tercera razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_3,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason4Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Cuarta razón de la beca',
      name: 'Pueblos y Nacionalidades',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_4,
    });
    catalogues.push({
      code: '2',
      description: 'Cuarta razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_4,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason5Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Quinta razón de la beca',
      name: 'Discapacidad',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_5,
    });
    catalogues.push({
      code: '2',
      description: 'Quinta razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_5,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipReason6Catalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Sexta razón de la beca',
      name: 'Otra',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_6,
    });
    catalogues.push({
      code: '2',
      description: 'Sexta razón de la beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_REASON_6,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de beca',
      name: 'Total',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de beca',
      name: 'Parcial',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createScholarshipFundingTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de financiamento de beca',
      name: 'Fondos propios',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de financiamento de beca',
      name: 'Transferencia del Estado',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de financiamento de beca',
      name: 'Donaciones',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'Tipo de financiamento de beca',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOLARSHIP_FUNDING_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSchoolDayCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Jornada',
      name: 'Matutina',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_DAY,
    });
    catalogues.push({
      code: '2',
      description: 'Jornada',
      name: 'Vespertina',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_DAY,
    });
    catalogues.push({
      code: '3',
      description: 'Jornada',
      name: 'Nocturna',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_DAY,
    });
    catalogues.push({
      code: '4',
      description: 'Jornada',
      name: 'Intensiva',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_DAY,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSchoolTypeCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Tipo de colegio',
      name: 'Fiscal',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '2',
      description: 'Tipo de colegio',
      name: 'Fiscomisional',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '3',
      description: 'Tipo de colegio',
      name: 'Particular',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '4',
      description: 'Tipo de colegio',
      name: 'Minicipal',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '5',
      description: 'Tipo de colegio',
      name: 'Extranjero',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_TYPE,
    });
    catalogues.push({
      code: '6',
      description: 'Tipo de colegio',
      name: 'No registra',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SCHOOL_TYPE,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createSexCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'sexo',
      name: 'Hombre',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SEX,
    });
    catalogues.push({
      code: '2',
      description: 'sexo',
      name: 'Mujer',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.SEX,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createStudentIncomeForCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Para que emplea sus ingresos',
      name: 'Financiar sus estudios',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
    });
    catalogues.push({
      code: '2',
      description: 'Para que emplea sus ingresos',
      name: 'Para mantener a su hogar',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
    });
    catalogues.push({
      code: '3',
      description: 'Para que emplea sus ingresos',
      name: 'Gastos personales',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
    });
    catalogues.push({
      code: '4',
      description: 'Para que emplea sus ingresos',
      name: 'No aplica',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.STUDENT_INCOME_FOR,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createStudentOccupationCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Ocupacion del estudiante',
      name: 'Solo estudia',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.STUDENT_OCCUPATION,
    });
    catalogues.push({
      code: '2',
      description: 'Ocupacion del estudiante',
      name: 'Trabaja y estudia',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.STUDENT_OCCUPATION,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createYesNoCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Si o No',
      name: 'Si',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.YES_NO,
    });
    catalogues.push({
      code: '2',
      description: 'Si o No',
      name: 'No',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.YES_NO,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }

  async createYesNoNACatalogues() {
    const catalogues: CreateCatalogueDto[] = [];
    catalogues.push({
      code: '1',
      description: 'Si, No y No aplica',
      name: 'Si',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.YES_NO_NA,
    });
    catalogues.push({
      code: '2',
      description: 'Si, No y No aplica',
      name: 'No',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.YES_NO_NA,
    });
    catalogues.push({
      code: '3',
      description: 'Si, No y No aplica',
      name: 'No apliaca',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.YES_NO_NA,
    });

    for (const catalogue of catalogues) {
      await this.catalogueService.create(catalogue);
    }
  }
}
