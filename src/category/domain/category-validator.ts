import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  validateSync,
} from 'class-validator';
import { Category } from './category.entity';

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  constructor({ name, description, is_active }: Category) {
    Object.assign(this, { name, description, is_active });
  }
}

export class CategoryValidator {
  errors: Record<string, string[]> = {};
  validatedData: Category | null = null;

  validate(entity: Category): boolean {
    const rules = new CategoryRules(entity);
    const errors = validateSync(rules);

    if (errors.length > 0) {
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints || {});
      }
      return false;
    }

    this.validatedData = entity;
    return true;
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
