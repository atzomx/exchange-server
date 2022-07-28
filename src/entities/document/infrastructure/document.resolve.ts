import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Document from "../domain/document.entity";
import DocumentController from "../application/document.controller";
import { ValidateArgs /*ValidateIdentifier*/ } from "@core/infrastructure/decorators";
import { DocumentInputCreate/*, DocumentInputUpdate*/ } from "./document.inputs";
// import { DirectionInputUpdate } from '../../direction/infrastructure/direction.inputs';


@Resolver(Document)
class DocumentResolver {
  private controller: DocumentController;

  constructor() {
    this.controller = new DocumentController();
  }

  @Query(() => Document, { description: "Return one Document."})
  async documentById(@Arg("id") id: string): Promise<Document>{
    const document = await this.controller.documentById(id);
    return document;
  }

  @Mutation(() => Document)
  @ValidateArgs(DocumentInputCreate, "data")
  async documentCreate(@Arg("data") document: DocumentInputCreate){
    const result = await this.controller.documentCreate(document);
    return result;
  }

  // @Mutation(() => Document)
  // @ValidateIdentifier(DocumentInputUpdate, "id")
  // @ValidateArgs(DocumentInputUpdate, "data")
  // async documentUpdate(
  //   @Arg("id") id: string, 
  //   @Arg("data") direction: DirectionInputUpdate
  // ){
  //   const result = await this.controller.directionUpdates(
  //     id.toString(),
  //     direction
  //   );
  //   return result;
  // }
}

export default DocumentResolver;