import { Max, Min } from "class-validator";
import { ArgsType, ClassType, Field, Int, ObjectType } from "type-graphql";

@ArgsType()
export class PaginateArgs {
  @Field(() => Int)
  @Min(0)
  public page = 1;

  @Field(() => Int)
  @Min(5)
  @Max(50)
  public limit = 10;
}

@ObjectType()
export class PaginateInfo {
  @Field(() => Int)
  public page!: number;

  @Field(() => Int)
  public pages!: number;

  @Field(() => Int)
  public total!: number;
}

export function PaginateResponse<TModel>(TModelClass: ClassType<TModel>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => PaginateInfo)
    public info!: PaginateInfo;

    @Field(() => [TModelClass])
    public results!: TModel[];
  }
  return PaginatedResponseClass;
}

export default PaginateResponse;
