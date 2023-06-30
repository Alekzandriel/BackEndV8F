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
   
  } from '@auth/dto';
  import { RolEntity, UsuarioEntity } from '@auth/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { RolService } from '../services/rol.service';
  
  @ApiTags('Rol')
  @Controller('rol')
  export class RolController {
    constructor(private rolService: RolService) {}
  
    @ApiOperation({ summary: 'Crear Rol' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su rol fue creado`,
        title: 'Rol Creado',
      }; 
    }
  
    @ApiOperation({ summary: 'Buscar Roles' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar todos los Roles`,
        title: 'Roles encontrados',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Rol' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar Rol',
        title: `Rol Encontrado`,
      };
    }
  
    @ApiOperation({ summary: 'Rol Actualizado' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su Rol fue actualizado',
        title: `Rol Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Rol' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su Rol fue eliminado',
        title: 'Rol Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todos los Roles' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: RolEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos los Roles han sido eliminados',
        title: 'Roles Eliminados',
      };
    }
  }