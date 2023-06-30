
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InformationTeacherEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { InformationTeachersService } from '@core/services';

@ApiTags('Information Teachers')
@Controller('information-teachers')
export class InformationTeachersController {
  constructor(private informationTeachersService: InformationTeachersService) {}
/*
  @ApiOperation({ summary: 'Crear InformacionDocente' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'InformacionDocente fue creado',
      title: 'InformacionDocente creado',
    };
  }
*/
  @ApiOperation({ summary: 'Buscar InformacionDocentes' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'InformacionDocentes fueron encontrados',
      title: 'InformacionDocentes encontrados',
    };
  }

  @ApiOperation({ summary: 'Buscar InformacionDocente' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'InformacionDocente fue encontrado',
      title: `InformacionDocente encontrado`,
    };
  }

  @ApiOperation({ summary: 'Actualizar InformacionDocente' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'InformacionDocente fue actualizado',
      title: `InformacionDocente actualizado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar InformacionDocente' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.remove(id);

    return {
      data: serviceResponse.data,
      message: `InformacionDocente fue eliminado`,
      title: `InformacionDocente eliminado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar InformacionDocentes' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationTeacherEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `InformacionDocentes fueron eliminados`,
      title: `InformacionDocentes eliminados`,
    };
  }
}

