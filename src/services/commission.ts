import { CommissionResponse } from "../models/commission";
import { Transaction } from "../models/transaction";
import convert from "../helpers/convert";
import rules from "./rules";
import turnover from "./turnover";

const calculateCommission = async (
  transaction: Transaction
): Promise<CommissionResponse> => {
  const { date, amount, currency, clientId } = transaction;
  const euroAmount = await convert.getAmountInEuro(amount, currency, date);

  const commissions = []; // store the different commissions calculated
  const applyRules = [
    rules.defaultPricing,
    rules.clientWithDiscount,
    rules.highTurnoverDiscount,
  ];

  for (const rule of applyRules) {
    const commission = rule({ clientId, date, euroAmount });
    if (commission !== undefined) {
      commissions.push(commission);
    }
  }

  turnover.incrementTurnover(clientId, date, euroAmount);
  const lowestCommission = Math.min(...commissions);
  return {
    amount: lowestCommission.toFixed(2),
    currency: "EUR",
  };
};

export default {
  calculateCommission,
};
