import { Injectable } from '@nestjs/common';
import { RolesService } from '@auth/services';
import { CreateRoleDto } from '@auth/dto';

@Injectable()
export class RolesSeeder {
  constructor(private rolesService: RolesService) {}

  async run() {
    await this.createRoles();
  }

  async createRoles() {
    const roles: CreateRoleDto[] = [];
    roles.push(
      {
        code: 'admin',
        name: 'Administrador',
      },
      {
        code: 'teacher',
        name: 'Docente',
      },
      {
        code: 'coordinator_administrative',
        name: 'Coordinador Administrativo',
      },
      {
        code: 'coordinator_career',
        name: 'Coordinador Carrera',
      },
      {
        code: 'rector',
        name: 'Rector',
      },
    );

    for (const role of roles) {
      await this.rolesService.create(role);
    }
  }
}
