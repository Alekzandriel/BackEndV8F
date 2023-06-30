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
  import {  TareaEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { TareaService } from '../services/tarea.service';
  
  @ApiTags('Tarea')
  @Controller('tarea')
  export class TareaController {
    constructor(private tareaService: TareaService) {}
  
    @ApiOperation({ summary: 'Crear Tarea' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.create(payload);
      return {
        data: serviceResponse.data,
        message: `La Tarea fue creada`,
        title: 'Tarea Creada',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar todas las Tareas' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Las Tareas fue encontradas`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar Tarea' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Buscar Tarea',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Tarea' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'La Tarea fue actualizada',
        title: `Tarea Actualizada`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Tarea' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'La Tarea fue eliminada',
        title: 'Tarea Eliminada',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todas las Tareas' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: TareaEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Las Tareas fueron eliminadas',
        title: 'Tarea Eliminadas',
      };
    }
  }
  