import { loansData, paymentsData } from '../db/data';
import { BalanceModel } from '../models/commandModel';

export const balanceController = (balance: BalanceModel): void => {
  let { borrowerName, bankName, emiNumber } = balance;

  const { noOfYears, emi, amount } = loansData[borrowerName][bankName];

  let lumSumPaid = 0;

  if (paymentsData[borrowerName] && paymentsData[borrowerName][bankName]) {
    lumSumPaid = paymentsData[borrowerName][bankName].reduce((previousValue, currentValue) => {
      return currentValue.emiNumber <= emiNumber ? previousValue + currentValue.lumpSumAmount : previousValue;
    }, 0);
  }

  const potentialAmountPaid = (emi * emiNumber) + lumSumPaid;
  const amountPaid = potentialAmountPaid < amount ? potentialAmountPaid : amount;
  const potentialPendingEmiCount = noOfYears * 12 - emiNumber - Math.floor(lumSumPaid / emi);
  const pendingEmiCount = potentialPendingEmiCount < 0 ? 0 : potentialPendingEmiCount;

  console.log(bankName, borrowerName, amountPaid, pendingEmiCount);

};
