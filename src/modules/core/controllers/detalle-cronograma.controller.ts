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
  import {  DetalleCronogramaEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { DetalleCronogramaService } from '../services/detalle-cronograma.service';
  
  @ApiTags('DetalleCronograma')
  @Controller('detalleCronograma')
  export class DetalleCronogramaController{
    constructor(private detalleCronogramaService: DetalleCronogramaService) {}
  
    @ApiOperation({ summary: 'Crear DetalleCronograma' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.detalleCronogramaService.create(payload);
      return {
        data: serviceResponse.data,
        message: `El Detalle del Cronograma fue creado`,
        title: 'Detalle Cronograma Creado',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar todos los DetalleCronograma' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.detalleCronogramaService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `DetalleCronograma fue encontrado`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar DetalleCronograma' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.detalleCronogramaService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Buscar DetalleCronograma',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar DetalleCronograma' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.detalleCronogramaService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'DetalleCronograma fue actualizado',
        title: `DetalleCronograma Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar DetalleCronograma' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.detalleCronogramaService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'El Detalle Cronograma fue eliminado',
        title: 'DetalleCronograma Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todos los Detalle Cronograma' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: DetalleCronogramaEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.detalleCronogramaService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Detalles Cronograma fueron eliminados',
        title: 'Detalle Cronograma Eliminados',
      };
    }
  }
  