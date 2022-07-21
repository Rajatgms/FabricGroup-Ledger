import { PaymentModel } from '../models/commandModel';
import DbController from './dbController';
import Base from './baseController';

interface IPaymentController {
  lumpSumAmount: number,
  emiNumber: number,
  addPayment: () => void
}

class PaymentController extends Base implements IPaymentController {
  lumpSumAmount: number;
  emiNumber: number;

  constructor(payment: PaymentModel) {
    super(payment);
    this.lumpSumAmount = payment.lumpSumAmount;
    this.emiNumber = payment.emiNumber;
  }

  addPayment() {
    let { bankName, borrowerName, lumpSumAmount, emiNumber } = this;

    const dbInstance = new DbController();

    const loanData = dbInstance.fetchLoanData(bankName, borrowerName);

    if (loanData) {
      const { amount, emi } = loanData;
      const pendingAmount = amount - (emiNumber * emi);

      if (lumpSumAmount > pendingAmount) {
        console.log('WARNING Lump Sum Amount exceed the pending Amount');
      } else {
        dbInstance.addPaymentData(bankName, borrowerName, { lumpSumAmount, emiNumber });
      }
    }
  }
}

export default PaymentController;
