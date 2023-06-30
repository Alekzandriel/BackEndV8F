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
import { CandidatoEntity } from '@core/entities';

import { ResponseHttpModel } from '@shared/models';
import { CandidatoService } from '../services/candidato.service';

@ApiTags('Candidato')
@Controller('candidatos')
export class CandidatoController {
  constructor(private candidatoService: CandidatoService) {}

  @ApiOperation({ summary: 'Crear Candidato' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoService.create(payload);
    return {
      data: serviceResponse.data,
      message: `Su candidato fue creado`,
      title: 'candidato Creado',
    };
  }

  @ApiOperation({ summary: 'Buscar candidatos' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoService.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Buscar todos los Candidatos`,
      title: 'Candidatos encontrados',
    };
  }

  @ApiOperation({ summary: 'Buscar Candidato' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoService.findOne(id);
    return {
      data: serviceResponse.data,
      message: 'Mostrar Candidato',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Candidato Actualizado' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: 'Su Candidato fue actualizado',
      title: `Candidato Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Candidato' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoService.remove(id);
    return {
      data: serviceResponse.data,
      message: 'Su Candidato fue eliminado',
      title: 'Candidato Eliminado',
    };
  }

  @ApiOperation({ summary: 'Eliminar todos los Candidatos' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CandidatoEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'Todos los Candidatos han sido eliminados',
      title: 'Candidatos Eliminados',
    };
  }
}