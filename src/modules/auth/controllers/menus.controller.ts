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
import { Auth } from '@auth/decorators';
import { CreateMenuDto, FilterMenuDto, UpdateMenuDto } from '@auth/dto';
import { MenuEntity } from '@auth/entities';
import { ResponseHttpModel } from '@shared/models';
import { MenusService } from '@auth/services';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @ApiOperation({ summary: 'Crear Uno' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateMenuDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Menú fue creado',
      title: 'Menú Creado',
    };
  }

  @ApiOperation({ summary: 'Catálogo' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catálogo`,
      title: `Catálogo`,
    };
  }

  @ApiOperation({ summary: 'Menús barra lateral' })
  @Get('sidebar')
  @HttpCode(HttpStatus.OK)
  async getMenusForSidebar(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.getMenusForSidebar();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Menú barra lateral`,
      title: `Menú barra lateral`,
    };
  }

  @ApiOperation({ summary: 'Buscar Todos' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterMenuDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Fueron Encontrados`,
      title: 'Encontrados',
    };
  }

  @ApiOperation({ summary: 'Buscar Uno' })
  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Encontrado ${id}`,
      title: `Encontrado`,
    };
  }

  @ApiOperation({ summary: 'Actualizar un menú' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMenuDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Menú fue actualizado${id}`,
      title: `Menú actualizado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Uno' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Menú fue eliminado ${id}`,
      title: `Menú eliminado`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Todo' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: MenuEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.menusService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Menus fueron eliminados`,
      title: `Menus eliminados`,
    };
  }
}
