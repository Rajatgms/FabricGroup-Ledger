import { LoanDataModel, LoansDataModel, PaymentDataModel, PaymentsDataModel } from '../models/dataModel';

const loans: LoansDataModel = {};
const payments: PaymentsDataModel = {};

class DbController {
  loans: LoansDataModel;
  payments: PaymentsDataModel;

  constructor() {
    this.loans = loans;
    this.payments = payments;
  }

  addLoanData(bankName: string, borrowerName: string, loanData: LoanDataModel) {
    const { principal, noOfYears, rateOfInterest, amount, emi } = loanData;
    if (!this.loans[borrowerName]) {
      this.loans[borrowerName] = {};
    }

    if (!this.loans[borrowerName][bankName]) {
      this.loans[borrowerName][bankName] = {
        principal,
        noOfYears,
        rateOfInterest,
        amount,
        emi,
      };
    }
  }

  fetchLoanData(bankName: string, borrowerName: string): LoanDataModel {
    if (this.loans[borrowerName] && this.loans[borrowerName][bankName]) {
      return this.loans[borrowerName][bankName];
    } else {
      console.log(`Loan details is not present`);
      return null;
    }
  }

  addPaymentData(bankName: string, borrowerName: string, paymentData: PaymentDataModel) {
    let { lumpSumAmount, emiNumber } = paymentData;

    if (!this.payments[borrowerName]) {
      this.payments[borrowerName] = {};
    }

    if (!this.payments[borrowerName][bankName]) {
      this.payments[borrowerName][bankName] = [];
    }

    this.payments[borrowerName][bankName].push({ lumpSumAmount, emiNumber });
  }

  fetchPaymentData(bankName: string, borrowerName: string): PaymentDataModel[] {
    if (this.payments[borrowerName] && this.payments[borrowerName][bankName]) {
      return this.payments[borrowerName][bankName];
    } else {
      return null;
    }
  }
}

export default DbController;
