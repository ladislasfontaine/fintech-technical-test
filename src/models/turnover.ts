interface Turnover {
  [month: string]: number;
}

export interface Turnovers {
  [clientId: number]: Turnover;
}
