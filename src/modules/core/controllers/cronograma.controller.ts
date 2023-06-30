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
  import {  CronogramaEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { CronogramaService } from '../services/cronograma.service';
  
  @ApiTags('Cronograma')
  @Controller('cronograma')
  export class CronogramaController {
    constructor(private cronogramaService: CronogramaService) {} //esto llevar a los this ej: cronogramaService
  
    @ApiOperation({ summary: 'Crear Cronograma' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.create(payload);
      return {
        data: serviceResponse.data,
        message: `El cronograma fue creado`,
        title: 'Cronograma Creado',
      };
    }
  
    @ApiOperation({ summary: 'Buscar todos los cronogramas' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Obtener el cronograma actual`,
        title: 'Cronogramas Obtenidos',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Cronograma' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Cronograma fue encontrado',
        title: `Cronograma encontrado`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Cronograma' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'El Cronograma fue actualizado',
        title: `Cronograma Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Cronograma' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Cronograma fue eliminado',
        title: 'Cronograma eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Borrar todos los cronogramas' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: CronogramaEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Los Cronogramas fueron eliminados',
        title: 'Cronograma eliminados',
      };
    }
  }
  