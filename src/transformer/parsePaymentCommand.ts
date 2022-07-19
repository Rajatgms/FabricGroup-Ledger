import { PaymentModel } from '../models/commandModel';

const parsePaymentCommand = (command: string[]): PaymentModel => {
  let [, bankName, borrowerName, lumpSumAmount, emiNumber] = command;
  return {
    bankName,
    borrowerName,
    lumpSumAmount: parseInt(lumpSumAmount),
    emiNumber: Math.ceil(parseFloat(emiNumber)),
  };
};


export default parsePaymentCommand;
