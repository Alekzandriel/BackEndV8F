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
  import { ConfiguracionEntity } from '@core/entities';
  import { ConfiguracionService } from '../services/configuracion.service';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('Configuracion')
  @Controller('configuracion')
  export class ConfiguracionController {
    constructor(private ConfiguracionService: ConfiguracionService) {}
  
    @ApiOperation({ summary: 'Crear Configuración' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su configuracion ha sido creada`,
        title: 'Configuración Creada',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Configuración' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar las Configuraciones Ej:codigoReseteoClave= 1020`,
        title: 'Configuraciones encontradas',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Configuración' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Configuración fue encontrada',
        title: `Configuración encontrada`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Configuración' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su Configuración fue actualizada',
        title: `Configuración Actualizada`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Configuración' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su configuración fue eliminada',
        title: 'Configuración Eliminada',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Configuraciones' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: ConfiguracionEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos las configuraciones han sido eliminadas',
        title: 'Configuraciones Eliminadas',
      };
    }
  }