import { LoanModel } from '../models/commandModel';
import DbController from './dbController';
import Base from './baseController';

interface ILoanController {
  principal: number,
  noOfYears: number,
  rateOfInterest: number,
  addLoan: () => void
}

class LoanController extends Base implements ILoanController {
  principal: number;
  noOfYears: number;
  rateOfInterest: number;

  constructor(loan: LoanModel) {
    super(loan);
    this.principal = loan.principal;
    this.noOfYears = loan.noOfYears;
    this.rateOfInterest = loan.rateOfInterest;
  }

  addLoan() {
    const { bankName, borrowerName, principal, noOfYears, rateOfInterest } = this;
    const loanData = {
      principal,
      noOfYears,
      rateOfInterest,
      amount: principal + (principal * noOfYears * rateOfInterest * 0.01),
      emi: Math.ceil((principal + (principal * noOfYears * rateOfInterest * 0.01)) / (noOfYears * 12)),
    };
    new DbController().addLoanData(bankName, borrowerName, loanData);
  }
}

export default LoanController;
