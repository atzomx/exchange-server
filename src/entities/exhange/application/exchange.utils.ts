import { v4 as uuidv4 } from "uuid";

export const getCalculatedShare = (amount: number) => {
  return Math.round(amount * 0.1);
};

export const getExchangeCode = () => {
  return uuidv4();
};

export default { getCalculatedShare, getExchangeCode };
