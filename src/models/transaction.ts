import { check } from "express-validator";

export const transactionValidation = [
  check("date").isString().isLength({ min: 10, max: 10 }),
  check("amount").isNumeric(),
  check("currency").isAlpha().isLength({ min: 1, max: 5 }),
  check("client_id").isInt(),
];

export interface Transaction {
  date: string;
  amount: number;
  currency: string;
  clientId: number;
}
