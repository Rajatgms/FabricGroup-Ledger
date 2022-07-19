import { PaymentModel } from '../models/commandModel';
import { loansData, paymentsData } from '../db/data';

export const paymentController = (payment: PaymentModel):void => {
  let { bankName, borrowerName, lumpSumAmount, emiNumber } = payment;

  const { amount, emi } = loansData[borrowerName][bankName];
  const pendingAmount = amount - (emiNumber * emi);

  if (!paymentsData[borrowerName]) {
    paymentsData[borrowerName] = {};
  }

  if (!paymentsData[borrowerName][bankName]) {
    paymentsData[borrowerName][bankName] = [];
  }

  if (lumpSumAmount > pendingAmount) {
    console.log('WARNING Lump Sum Amount exceed the pending Amount');
  } else {
    paymentsData[borrowerName][bankName].push({ lumpSumAmount, emiNumber });
  }
}
