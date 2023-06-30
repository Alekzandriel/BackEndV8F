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

  import { UsuarioEntity } from '@auth/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { UsuariosService } from '../services/usuarios.service';
  
  @ApiTags('Usuarios')
  @Controller('usuarios')
  export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}
  
    @ApiOperation({ summary: 'Crear Usuarios' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usuariosService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su Usuario fue creado`,
        title: 'Usuario Creado',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Usuarios' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usuariosService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar todos los Usuarios`,
        title: 'Usuarios encontrados',
      };
    }
  
    @ApiOperation({ summary: 'Buscar Usuario' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usuariosService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar usuario',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Usuario Actualizado' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usuariosService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su usuario fue actualizado',
        title: `Usuario Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar Usuario' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usuariosService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su usuario fue eliminado',
        title: 'Usuario Eliminado',
      };
    }
  
    @ApiOperation({ summary: 'Eliminar todos los Usuarios' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: UsuarioEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usuariosService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos los Usuarios han sido eliminados',
        title: 'Usuarios Eliminados',
      };
    }
  }