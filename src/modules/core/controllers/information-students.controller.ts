
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
import { InformationStudentEntity } from '@core/entities';
import { InformationStudentsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';


@ApiTags('Information Students')
@Controller('information-students')
export class InformationStudentsController {
  constructor(private informationStudentsService: InformationStudentsService) {}

  @ApiOperation({ summary: 'Crear InformacionEstudiantes' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'InformaciónEstudiantes fue creado',
      title: 'InformaciónEstudiantes creado',
    };
  }

  @ApiOperation({ summary: 'Buscar InformaciónEstudiantes' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `InformaciónEstudiantes fueron encontrados`,
      title: 'InformaciónEstudiantes encontrados',
    };
  }

  @ApiOperation({ summary: 'Ver una informacion Estudiantes' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `InformacionEstudiante ${id}`,
      title: `InformacionEstudiante encontrado`,
    };
  }

  @ApiOperation({ summary: 'Actualizar InformacionEstudiante' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `InformacionEstudiante fue actualizada ${id}`,
      title: `InformacionEstudiante actualizada`,
    };
  }

  @ApiOperation({ summary: 'Eliminar InformacionEstudiantes' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.remove(id);
    return {
      data: serviceResponse.data,
      message: `InformacionEstudiante fue eliminado ${id}`,
      title: `InformacionEstudiante eliminado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar InformacionEstudiantes' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationStudentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `InformacionEstudiante fueron eliminados`,
      title: `InformacionEstudiante eliminados`,
    };
  }
}
