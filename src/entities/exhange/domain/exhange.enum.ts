import { registerEnumType } from "type-graphql";

export enum IExchageStatus {
  "pending" = "pending",
  "rejected" = "rejected",
  "accepted" = "accepted",
  "in-progress" = "in-progress",
  "validating" = "validating",
}

export enum IExchageType {
  "product" = "product",
  "service" = "service",
}

registerEnumType(IExchageStatus, {
  name: "Exhange Status",
  description: "Exhange Status",
});

registerEnumType(IExchageType, {
  name: "Exhange Types",
  description: "Exhange Types",
});
