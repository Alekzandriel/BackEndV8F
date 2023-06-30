import { Injectable } from '@nestjs/common';
import { CataloguesSeeder } from './catalogues-seeder';
import { UsersSeeder } from './users-seeder';
import { RolesSeeder } from './roles-seeder';
import { MenusSeeder } from './menus-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private cataloguesSeeder: CataloguesSeeder,
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
    private menusSeeder: MenusSeeder,
  ) {}

  async run() {
    await this.cataloguesSeeder.run();
    await this.rolesSeeder.run();
    await this.usersSeeder.run();
    await this.menusSeeder.run();
  }
}
