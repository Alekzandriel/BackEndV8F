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
  import {  ListaEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { ListaService } from '../services/lista.service';
  
  @ApiTags('Lista')
  @Controller('lista')
  export class ListaController {
    constructor(private listaService: ListaService) {}
  
    @ApiOperation({ summary: 'Crear Lista' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.listaService.create(payload);
      return {
        data: serviceResponse.data,
        message: `La Lista fue creada`,
        title: 'Lista Creada',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar todas las Listas' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.listaService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `La Lista fue encontrada`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Encontrar Lista' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.listaService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Buscar Lista',
        title: `Lista encontrada`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar DetalleCronograma' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.listaService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'La Lista fue actualizada',
        title: `Lista Actualizada`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Lista' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.listaService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'La Lista fue eliminada',
        title: 'Lista Eliminada',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todas las Listas' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: ListaEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.listaService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Las Listas fueron eliminadas',
        title: 'Lista Eliminadas',
      };
    }
  }
  