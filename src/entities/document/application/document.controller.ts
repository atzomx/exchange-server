import Document from "../domain/document.entity";
import DocumentRepository from "../domain/document.repository";
import { DocumentInputCreate } from "../infrastructure/document.inputs";
import { DocumentAlreadyExistError } from "../domain/document.errors";
import documentUtils from "./document.utils";

class DocumentController {
  private repository: DocumentRepository;

  constructor() {
    this.repository = new DocumentRepository;
  }

  documentById(id: string){
    return this.repository.findById(id).populate("Documents");
  }

  async documentCreate(document: DocumentInputCreate): Promise<Document>{
    const query = {
      $and: [{ name: document.name }, { owner: document.owner }],
    };

    const existingDocument = await this.repository.findOne(query);
    if(existingDocument)
      throw new DocumentAlreadyExistError(document.name);

    const sanitized = documentUtils.sanitize({ ...document });

    const newDocument = { ...document, ...sanitized };
    const result = await this.repository.create({ ...newDocument });
    
    return result;
  }
}

export default DocumentController;