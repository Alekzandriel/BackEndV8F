import { Injectable } from '@nestjs/common';
import { MenusService } from '@auth/services';
import { CreateMenuDto } from '@auth/dto';
import { MenuTypeEnum } from '@auth/enums';
import { MenuEntity } from '@auth/entities';

@Injectable()
export class MenusSeeder {
  constructor(private menusService: MenusService) {}

  async run() {
    await this.createMenus();
  }

  async createMenus() {
    let menus: CreateMenuDto[] = [];
    menus.push(
      {
        code: 'profile',
        icon: 'pi pi-user',
        isVisible: true,
        label: 'Perfil',
        routerLink: '/profile',
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: 'administrator',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Administrador',
        type: MenuTypeEnum.LEFT_SIDE,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }
    menus = [];
    const menusAll = (await this.menusService.findAll()).data as MenuEntity[];
    const administratorMenu = menusAll.find(
      (menu) => (menu.code = 'administrator'),
    );

    menus.push(
      {
        code: 'users',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Usuarios',
        routerLink: '/administration/users',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'menus',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Menus',
        routerLink: '/administration/menus',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }
  }
}
