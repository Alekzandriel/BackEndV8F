import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import {
   
  } from '@core/dto';
  import { TipoListaEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { tipoListasService } from '../services/tipo-lista.service';
  
  @ApiTags('TipoLista')
  @Controller('tipoLista')
  export class TipoListaController {
    constructor(private TipoListaService: tipoListasService) {}
  
    @ApiOperation({ summary: 'Create Tipo Lista' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.TipoListaService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su Tipo de Lista fue creado`,
        title: 'Candidato Lista Creado',
      };
    }
  
    @ApiOperation({ summary: 'Find TipoLista' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.TipoListaService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar todos los Tipos de Lista Ej:Docente, Ej:Estudiante`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Find TipoLista' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.TipoListaService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar Lista',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Update Institution' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.TipoListaService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su tipo de lista fue actualizado',
        title: `Institution Updated`,
      };
    }
  
    @ApiOperation({ summary: 'Delete Institution' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.TipoListaService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su Tipo de Lista fue eliminado',
        title: 'Institution Deleted',
      };
    }
  
    @ApiOperation({ summary: 'Delete All Institutions' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: TipoListaEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.TipoListaService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos los Tipos de listas han sido eliminados',
        title: 'Institutions Deleted',
      };
    }
  }