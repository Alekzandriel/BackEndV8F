import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, PublicRoute, User } from '@auth/decorators';
import { AuthService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import {
  LoginDto,
  PasswordChangeDto,
  UpdateUserInformationDto,
  UpdateProfileDto,
} from '@auth/dto';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Ingresar' })
  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() payload: LoginDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.login(payload);

    return {
      data: serviceResponse.data,
      message: 'Acceso Correcto',
      title: 'Bienvenido',
    };
  }

  @ApiOperation({ summary: 'Cambiar Contraseña' })
  @Auth()
  @Put(':id/change-password')
  @HttpCode(HttpStatus.CREATED)
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: PasswordChangeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.changePassword(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Su contraseña fue cambiada',
      title: 'Contraseña cambiada',
    };
  }

  @ApiOperation({ summary: 'Buscar perfil' })
  @Auth()
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async findProfile(@User() user: UserEntity): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findProfile(user.id);

    return {
      data: serviceResponse.data,
      message: `Perfil fue encontrado`,
      title: `Perfil encontrado`,
    };
  }

  @ApiOperation({ summary: 'Buscar Información Usuario' })
  @Auth()
  @Get('user-information')
  @HttpCode(HttpStatus.CREATED)
  async findUserInformation(
    @User() user: UserEntity,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findUserInformation(user.id);

    return {
      data: serviceResponse.data,
      message: 'Información usuario fue encontrada',
      title: 'Información usuario encontrada',
    };
  }

  @ApiOperation({ summary: 'Actualizar Perfil' })
  @Auth()
  @Put('profile')
  @HttpCode(HttpStatus.CREATED)
  async updateProfile(
    @User() user: UserEntity,
    @Body() payload: UpdateProfileDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateProfile(
      user.id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Perfil fue actualizado',
      title: 'Perfil actualizado',
    };
  }

  @ApiOperation({ summary: 'Actualizar Información Usuario' })
  @Auth()
  @Put('user-information')
  @HttpCode(HttpStatus.CREATED)
  async updateUserInformation(
    @User('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateUserInformation(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Información Usuario fue actualizada',
      title: 'Información Usuario Actualizada',
    };
  }

  @ApiOperation({ summary: 'Ficha de Actualización' })
  @Auth()
  @Get('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  refreshToken(@User() user: UserEntity) {
    const serviceResponse = this.authService.refreshToken(user);

    return {
      data: serviceResponse.data,
      message: 'Acceso Correcto',
      title: 'Ficha Actualización',
    };
  }
}
