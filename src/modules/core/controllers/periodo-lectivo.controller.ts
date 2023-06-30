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
  import {  PeriodoLectivoEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { PeriodoLectivoService } from '../services/periodo-lectivo.service';
  
  @ApiTags('PeriodoLectivo')
  @Controller('periodoLectivo')
  export class PeriodoLectivoController {
    constructor(private periodoLectivoService: PeriodoLectivoService) {}
  
    @ApiOperation({ summary: 'Crear PeriodoLectivo' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.periodoLectivoService.create(payload);
      return {
        data: serviceResponse.data,
        message: `El PeriodoLectivo fue creado`,
        title: 'PeriodoLectivo Creado',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar todos los PeriodoLectivo' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.periodoLectivoService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `El Periodo Lectivo fue encontrado`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar PeriodoLectivo' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.periodoLectivoService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Buscar Periodo Lectivo',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar PeriodoLectivo' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.periodoLectivoService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'El Periodo Lectivofue actualizado',
        title: `Periodo Lectivo Actualizada`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar PeriodoLectivo' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.periodoLectivoService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'PeriodoLectivo fue eliminado',
        title: 'Periodo Lectivo Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todos los PeriodoLectivo' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: PeriodoLectivoEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.periodoLectivoService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Los Periodos Lectivos fueron eliminados',
        title: 'Periodo LectivoEliminados',
      };
    }
  }
  