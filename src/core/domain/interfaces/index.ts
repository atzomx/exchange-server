import { Request, Response } from "express";

export interface ICustomError {
  constrains: string;
  property: string;
}

export interface IContext {
  req: Request;
  res: Response;
  payload?: { id: string };
}
