import { BalanceModel } from '../models/commandModel';

const parseBalanceCommand = (command: string[]): BalanceModel => {
  let [, bankName, borrowerName, emiNumber] = command;
  return {
    bankName,
    borrowerName,
    emiNumber: Math.ceil(parseFloat(emiNumber)),
  };
};


export default parseBalanceCommand;
