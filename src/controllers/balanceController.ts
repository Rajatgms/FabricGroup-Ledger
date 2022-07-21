import DbController from './dbController';
import { BalanceModel } from '../models/commandModel';
import Base from './baseController';

interface IBalanceController {
  emiNumber: number,
  displayBalance: () => void
}

class BalanceController extends Base implements IBalanceController {
  emiNumber: number;

  constructor(balance: BalanceModel) {
    super(balance);
    this.emiNumber = balance.emiNumber;
  }

  displayBalance() {
    let { borrowerName, bankName, emiNumber } = this;
    const dbInstance = new DbController();


    const loanData = dbInstance.fetchLoanData(bankName, borrowerName);
    const previousPayments = dbInstance.fetchPaymentData(bankName, borrowerName);

    let lumSumPaid = 0;

    if (previousPayments) {
      lumSumPaid = previousPayments.reduce((previousPayment, currentPayment) => {
        return currentPayment.emiNumber <= emiNumber ? previousPayment + currentPayment.lumpSumAmount : previousPayment;
      }, 0);
    }

    if(loanData) {
      const { noOfYears, emi, amount } = loanData;
      const potentialAmountPaid = (emi * emiNumber) + lumSumPaid;
      const amountPaid = potentialAmountPaid < amount ? potentialAmountPaid : amount;
      const potentialPendingEmiCount = noOfYears * 12 - emiNumber - Math.floor(lumSumPaid / emi);
      const pendingEmiCount = potentialPendingEmiCount < 0 ? 0 : potentialPendingEmiCount;

      console.log(bankName, borrowerName, amountPaid, pendingEmiCount);
    }
  }
}

export default BalanceController;
