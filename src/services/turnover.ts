import { Turnovers } from "../models/turnover";

const turnovers: Turnovers = {};

const getTurnover = (clientId: number, date: string) => {
  const month = date.slice(0, -3);

  if (turnovers[clientId] && turnovers[clientId][month]) {
    return turnovers[clientId][month];
  }
  return 0.0;
};

const incrementTurnover = (clientId: number, date: string, amount: number) => {
  const month = date.slice(0, -3);

  if (!turnovers[clientId]) {
    turnovers[clientId] = { [month]: amount };
  } else if (!turnovers[clientId][month]) {
    turnovers[clientId][month] = amount;
  } else {
    turnovers[clientId][month] += amount;
  }
};

export default {
  getTurnover,
  incrementTurnover,
};
