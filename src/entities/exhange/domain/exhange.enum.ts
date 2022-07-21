import { registerEnumType } from "type-graphql";

export enum IExchageStatus {
  "pending" = "pending",
  "rejected" = "rejected",
  "accepted" = "accepted",
  "processing" = "processing",
  "validating" = "validating",
}

export enum IExchageType {
  "product" = "product",
  "service" = "service",
}

registerEnumType(IExchageStatus, {
  name: "ExhangeStatus",
  description: "Exhange Status",
});

registerEnumType(IExchageType, {
  name: "ExhangeTypes",
  description: "Exhange Types",
});
