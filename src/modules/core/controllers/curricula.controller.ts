
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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CurriculumEntity } from '@core/entities';
import { CurriculaService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Curricula')
@Controller('curricula')
export class CurriculaController {
  constructor(private curriculaService: CurriculaService) {}

  @ApiOperation({ summary: 'Crear Curricula' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Curricula fue creado',
      title: 'Curricula Creado',
    };
  }

  @ApiOperation({ summary: 'Buscar Curriculas' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Curriculas fueron encontradas',
      title: 'Curriculas encontradas',
    };
  }

  @ApiOperation({ summary: 'Buscar Curricula' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Curricula fue encontrada',
      title: `Curricula encontrada`,
    };
  }

  @ApiOperation({ summary: 'Actualizar Curricula' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Curricula fue actualizada',
      title: 'Curricula actualizada',
    };
  }

  @ApiOperation({ summary: 'Eliminar Curricula' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.remove(id);

    return {
      data: serviceResponse.data,
      message: 'Curricula fue eliminada',
      title: `Curriculum Eliminada`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Curriculas' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CurriculumEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'Curriculas fueron eliminadas',
      title: 'Curriculas Eliminadas',
    };
  }
}
