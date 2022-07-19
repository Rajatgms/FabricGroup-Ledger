import { LoanModel } from '../models/commandModel';
import { loansData } from '../db/data';

export const loanController = (loan: LoanModel): void => {
  let { bankName, borrowerName, principal, noOfYears, rateOfInterest } = loan;

  if (!loansData[borrowerName]) {
    loansData[borrowerName] = {};
  }

  if (!loansData[borrowerName][bankName]) {
    loansData[borrowerName][bankName] = {
      principal,
      noOfYears,
      rateOfInterest,
      amount: principal + (principal * noOfYears * rateOfInterest * 0.01),
      emi: Math.ceil((principal + (principal * noOfYears * rateOfInterest * 0.01)) / (noOfYears * 12)),
    };
  }
}
