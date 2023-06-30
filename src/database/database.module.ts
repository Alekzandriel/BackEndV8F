import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { CataloguesSeeder } from './seeds/catalogues-seeder';
import { UsersSeeder } from './seeds/users-seeder';
import { RolesSeeder } from './seeds/roles-seeder';
import { MenusSeeder } from './seeds/menus-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CataloguesSeeder,
    UsersSeeder,
    RolesSeeder,
    MenusSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
