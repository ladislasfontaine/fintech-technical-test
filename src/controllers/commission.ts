import { NextFunction, Request, Response } from "express";
import { Transaction } from "../models/transaction";
const { validationResult } = require("express-validator");

import commissionService from "./../services/commission";

const calculateCommission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { date, amount, currency, client_id } = req.body;
    const transaction: Transaction = {
      date,
      amount: parseFloat(amount),
      currency,
      clientId: client_id,
    };
    const data = await commissionService.calculateCommission(transaction);

    res.status(200).json(data);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export default calculateCommission;
