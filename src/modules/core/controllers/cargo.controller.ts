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

  import { CargoEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { CargoService } from '../services/cargo.service';
  
  @ApiTags('Cargo')
  @Controller('cargo')
  export class CargoController {
    constructor(private cargoService: CargoService) {}
  
    @ApiOperation({ summary: 'Crear Cargo' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Cargo fue creado`,
        title: 'Cargo Creado',
      };
    }
  
    @ApiOperation({ summary: 'Buscar todos los cargos' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Todos los cargos fueron encontrados`,
        title: 'Todos los cargos encontrados',
      };
    }
  
    @ApiOperation({ summary: 'Buscar cargo' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Cargo fue encontrado',
        title: `Cargo encontrado`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Cargo' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Cargo fue actualizado',
        title: `Cargo Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Cargo' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Cargo fue eliminado',
        title: 'Cargo Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todos los cargos' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: CargoEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos los cargos fueron eliminados',
        title: 'Cargos eliminados',
      };
    }
  }
  