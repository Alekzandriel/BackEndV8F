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
  import { TipoUsuarioEntity, UsuarioEntity } from '@auth/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { TipoUsuariosService } from '../services/tipo-usuarios.service';
  
  @ApiTags('Tipousuarios')
  @Controller('tipousuarios')
  export class VotoController {
    constructor(private tipoUsuariosService: TipoUsuariosService) {}
  
    @ApiOperation({ summary: 'Crear Tipo Usuario' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoUsuariosService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Tipo Usuario fue creado`,
        title: 'Tipo Usuario Creado',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Tipo Usuarios' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoUsuariosService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar Tipo Usuarios`,
        title: 'Tipo Usuarios encontrados',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Tipo Usuario' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoUsuariosService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar Tipo Usuario',
        title: `Tipo Usuario encontrado`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Tipo Usuario' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoUsuariosService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Tipo Usuario fue actualizado',
        title: `Tipo Usuario Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Tipo Usuario' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoUsuariosService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Tipo Usuario fue eliminado',
        title: 'Tipo Usuario Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Tipo Usuarios' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: TipoUsuarioEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoUsuariosService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Tipo Usuarios han sido eliminados',
        title: 'Tipo Usuarios Eliminados',
      };
    }
  }