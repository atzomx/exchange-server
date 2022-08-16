import { registerEnumType } from "type-graphql";

export enum IDocumentType {
    "application/pdf" = "application/pdf",
    "image/jpeg" = "image/jpeg",
    "image/png" = "image/png"
}

registerEnumType(IDocumentType, {
    name: "Type",
    description: "Document type",
});