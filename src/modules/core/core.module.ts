import { Global, Module } from '@nestjs/common';

import {
  
  CataloguesController,
  CurriculaController,
  InformationStudentsController,
  InstitutionsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
  CareersController,

  CandidatoController,
  CandidatoListaController,
  CargoController,
  CarreraController,
  ConfiguracionController,
  CronogramaController,
  ListaController,
  TipoListaController,
  DetalleCronogramaController,
  PeriodoLectivoController,
  TareaController,
  VotoController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculaService,
  InformationStudentsService,
  InstitutionsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,

  CandidatoListaService,
  CargoService,
  CarreraService,
  ConfiguracionService,
  DetalleCronogramaService,
  ListaService,
  PeriodoLectivoService,
  TareaService,
  tipoListasService,
  VotoService,
  CandidatoService,
  CronogramaService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';


@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculaController,

    InformationStudentsController,
    InformationTeachersController,
    
    InstitutionsController,
    StudentsController,
    SubjectsController,
    
    CandidatoListaController,
    CandidatoController,
    CargoController,
    CarreraController,
    ConfiguracionController,
    CronogramaController,
    DetalleCronogramaController,
    ListaController,
    PeriodoLectivoController,
    TareaController,
    TipoListaController,
    VotoController,

  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,

    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    
   
    StudentsService,
    SubjectsService,

    CandidatoListaService,
    CandidatoService,
    CargoService,
    CarreraService,
    ConfiguracionService,
    CronogramaService,
    DetalleCronogramaService,
    ListaService,
    PeriodoLectivoService,
    TareaService,
    tipoListasService,
    VotoService
  ],
  exports: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,

    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    
  
    StudentsService,
    SubjectsService,

    CandidatoListaService,
    CandidatoService,
    CargoService,
    CarreraService,
    ConfiguracionService,
    CronogramaService,
    DetalleCronogramaService,
    ListaService,
    PeriodoLectivoService,
    TareaService,
    tipoListasService,
    VotoService
  ],
})
export class CoreModule {}
