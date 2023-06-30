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
  import { VotoEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { VotoService } from '../services/voto.service';
  
  @ApiTags('Voto')
  @Controller('voto')
  export class VotoController {
    constructor(private votoService: VotoService) {}
  
    @ApiOperation({ summary: 'Crear Voto' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.votoService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su Voto fue creado`,
        title: 'Voto Creado',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Votos' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.votoService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar todos los Votos`,
        title: 'Votos encontrados',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Voto' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.votoService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar Voto',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Voto Actualizado' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.votoService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su Voto fue actualizado',
        title: `Voto Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Voto' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.votoService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su Voto fue eliminado',
        title: 'Voto Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todos los Votos' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: VotoEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.votoService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos los Votos han sido eliminados',
        title: 'Votos Eliminados',
      };
    }
  }