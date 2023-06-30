import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { RolesService, UsersService } from '@auth/services';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class UsersSeeder {
  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  async run() {
    await this.createUsers();
  }

  async createUsers() {
    const users: CreateUserDto[] = [];
    const roles = (await this.rolesService.findAll()).data as RoleEntity[];
    const adminRole = roles.find((role) => role.code === RoleEnum.ADMIN);
    const teacherRole = roles.find((role) => role.code === RoleEnum.TEACHER);
    const coordinatorAdministrativeRole = roles.find(
      (role) => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE,
    );
    const coordinatorCareerRole = roles.find(
      (role) => role.code === RoleEnum.COORDINATOR_CAREER,
    );
    const rectorRole = roles.find((role) => role.code === RoleEnum.RECTOR);

    users.push(
      {
        email: 'admin@gmail.com',
        lastname: 'Perez',
        name: 'Admin',
        password: '12345678',
        passwordChanged: false,
        roles: [adminRole],
        username: 'admin',
      },
      {
        email: 'teacher@gmail.com',
        lastname: 'Perez',
        name: 'Teacher',
        password: '12345678',
        passwordChanged: false,
        roles: [teacherRole],
        username: 'teacher',
      },
      {
        email: 'coordinator_administrative@gmail.com',
        lastname: 'Perez',
        name: 'Coordinator Administrative',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorAdministrativeRole],
        username: 'coordinator_administrative',
      },
      {
        email: 'coordinator_career@gmail.com',
        lastname: 'Perez',
        name: 'Coordinator Career',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorCareerRole],
        username: 'coordinator_career',
      },
      {
        email: 'rector@gmail.com',
        lastname: 'Perez',
        name: 'Rector',
        password: '12345678',
        passwordChanged: false,
        roles: [rectorRole],
        username: 'rector',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
