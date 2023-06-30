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

import { SubjectEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { SubjectsService } from '@core/services';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Create Subject' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.subjectsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Subject was created',
      title: 'Subject Created',
    };
  }

  @ApiOperation({ summary: 'Find All Subjects' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.subjectsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all subjects',
      title: 'success',
    };
  }

  @ApiOperation({ summary: 'Find Subject' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.subjectsService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Find subject`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Subject' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ) {
    const serviceResponse = await this.subjectsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Subject was updated',
      title: 'Subject Updated',
    };
  }

  @ApiOperation({ summary: 'Delete Subject' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.subjectsService.remove(id);

    return {
      data: serviceResponse.data,
      message: 'Subject was deleted',
      title: 'Subject Deleted',
    };
  }

  @ApiOperation({ summary: 'Delete All Subjects' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: SubjectEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.subjectsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'Subjects was deleted',
      title: 'Subjects Deleted',
    };
  }
}
