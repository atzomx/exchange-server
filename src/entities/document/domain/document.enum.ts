import { registerEnumType } from "type-graphql";

export enum IDocumentType {
    "pdf" = "pdf",
    "png" = "pmg",
}

registerEnumType(IDocumentType, {
    name: "Type",
    description: "Document type",
});