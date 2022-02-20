import axios from "axios";

const url = "https://api.exchangerate.host/";

async function getRate(currency: string, date: string): Promise<number> {
  const { data } = await axios.get(url + date);
  if (data.success === false) {
    throw new Error(`Error fetching rates for date: ${date}`);
  }
  const rate: number = data.rates[currency];
  if (rate === undefined) {
    throw new Error(`No rate for currency: ${currency}`);
  }
  return rate;
}

const getAmountInEuro = async (
  amount: number,
  currency: string,
  date: string
) => {
  if (currency === "EUR") {
    return amount;
  }
  const rate = await getRate(currency, date);
  if (rate === 0.0) {
    throw new Error(
      `Rate should not be ${rate} (for currency ${currency} on the ${date})`
    );
  }
  return amount / rate;
};

export default { getRate, getAmountInEuro };
