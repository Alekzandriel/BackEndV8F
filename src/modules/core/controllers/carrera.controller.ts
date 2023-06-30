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

  import { CarreraEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { CarreraService } from '../services/carrera.service';
  
  @ApiTags('Carrera')
  @Controller('carrera')
  export class CarreraController {
    constructor(private CarreraService: CarreraService) {}
  
    @ApiOperation({ summary: 'Crear Carrera' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su carrera ha sido creada`,
        title: 'Carrera Creado',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Carreras' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar las carreras acutuales Ej:Docente, Ej:Desarrollo de Software`,
        title: 'Carreras encontradas',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Carrera' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Carrera fue encontrada',
        title: `Carrera encontrada`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Carrera' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su carrera fue actualizada',
        title: `Carrera Actualizada`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Carrera' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su carrera fue eliminada',
        title: 'Carrera Eliminada',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Carreras' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: CarreraEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos las carreras han sido eliminadas',
        title: 'Carreras Eliminadas',
      };
    }
  }