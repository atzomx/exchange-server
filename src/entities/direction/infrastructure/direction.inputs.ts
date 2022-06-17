import { Length, MaxLength, MinLength, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class DirectionInputCreate {
  @Field()
  @MinLength(1)
  @MaxLength(30)
  public nameDirection!: string;

  @Field()
  @MinLength(1)
  @MaxLength(30)
  public estate!: string;

  @Field()
  @MinLength(1)
  @MaxLength(30)
  public town!: string;

  @Field()
  @MinLength(1)
  @MaxLength(30)
  public neighborhood!: string;

  @Field()
  @MinLength(1)
  @MaxLength(30)
  public street!: string;

  @Field()
  @MinLength(1)
  @MaxLength(10)
  public outdoorNumber!: number;

  @Field()
  @Length(5)
  public zipCode!: number;

  @Field({ nullable: true })
  @MinLength(1)
  @MaxLength(30)
  public extraIndications?: string;
}

@InputType()
export class DirectionInputUpdate {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  public nameDirection?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public estate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public town?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public neighborhood?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public street?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(10)
  public outdoorNumber?: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5)
  public zipCode?: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(150)
  public extraIndications?: string;
}

export default { DirectionInputCreate, DirectionInputUpdate };
