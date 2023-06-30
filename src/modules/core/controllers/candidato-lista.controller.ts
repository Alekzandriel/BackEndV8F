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
import { CandidatoListaEntity } from '@core/entities';

import { ResponseHttpModel } from '@shared/models';
import { CandidatoListaService } from '../services/candidato-lista.service';

@ApiTags('CandidatosLista')
@Controller('candidatosLista')
export class CandidatoListaController {
  constructor(private candidatoListaService: CandidatoListaService) {}

  @ApiOperation({ summary: 'Crear Candidato Lista' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.create(payload);
    return {
      data: serviceResponse.data,
      message: `Candidato Lista fue creado`,
      title: 'Candidato Lista Creado',
    };
  }

  @ApiOperation({ summary: 'Buscar Candidato Listas' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Candidato Listas fueron encontrados`,
      title: 'Candidato Listas encontrados',
    };
  }

  @ApiOperation({ summary: 'Buscar Candidato Lista' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.findOne(id);
    return {
      data: serviceResponse.data,
      message: 'Candidato Lista fue encontrado',
      title: `Candidato Lista encontrado`,
    };
  }

  @ApiOperation({ summary: 'Actualizar Candidato Lista' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: 'Candidato Lista fue actualizado',
      title: `Candidato Lista actualizado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Candidato Lista' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.remove(id);
    return {
      data: serviceResponse.data,
      message: 'Candidato Lista fue eliminado',
      title: 'Candidato Lista eliminado',
    };
  }

  @ApiOperation({ summary: 'Eliminar todos los Candidato Listas' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CandidatoListaEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'Candidato Listas fueron eliminados',
      title: 'Candidato Listas eliminados',
    };
  }
}
