import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';
import {
  isEnumValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class CatalogueDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly code: string;

  @IsString(isStringValidationOptions())
  @MinLength(5, minLengthValidationOptions())
  readonly description: string;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsEnum(CatalogueStateEnum, isEnumValidationOptions())
  readonly state: CatalogueStateEnum;

  @IsString(isStringValidationOptions())
  readonly type: CatalogueTypeEnum;
}
