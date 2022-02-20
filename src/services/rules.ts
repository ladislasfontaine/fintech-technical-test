import turnover from "./turnover";

const defaultPricing = ({ euroAmount }: any): number | void => {
  const commission = euroAmount * 0.005;
  return commission < 0.05 ? 0.05 : commission;
};

const clientWithDiscount = ({ clientId }: any): number | void => {
  if (clientId === 42) {
    return 0.05;
  }
};

const highTurnoverDiscount = ({ clientId, date }: any): number | void => {
  const clientMonthlyTurnover = turnover.getTurnover(clientId, date);

  if (clientMonthlyTurnover >= 1000.0) {
    return 0.03;
  }
};

export default {
  defaultPricing,
  clientWithDiscount,
  highTurnoverDiscount,
};
