import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category-validator";

export type CategoryConstructorsProps = {
  category_id?:Uuid;
  name:string;
  description?:string | null;
  is_active?:boolean;
  created_at?: Date;
}

export type CategoryCreateComand = {
  name:string;
  description?:string | null;
  is_active?:boolean;
}

export class Category {
  category_id: Uuid;
  name:string;
  description:string | null;
  is_active:boolean;
  created_at: Date;

  constructor(props: CategoryConstructorsProps) {
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: CategoryCreateComand): Category {
    const category = new Category(props);
    Category.validate(category);
    return new Category(props);
  }

  changeName(name:string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description:string): void {
    this.description = description;
    Category.validate(this);
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  static validate(entity: Category) {
     const validator = CategoryValidatorFactory.create();
     return validator.validate(entity);
  }

  toJSON() {
    return {
      category_id:this.category_id,
      name:this.name,
      description:this.description,
      is_active:this.is_active,
      created_at:this.created_at
    }
  }
}