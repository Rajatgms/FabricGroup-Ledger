import { LoanModel } from '../models/commandModel';

const parseLoanCommand = (command: string[]): LoanModel => {
  let [, bankName, borrowerName, principal, noOfYears, rateOfInterest] = command;
  return {
    bankName,
    borrowerName,
    principal: parseInt(principal),
    noOfYears: parseInt(noOfYears),
    rateOfInterest: parseInt(rateOfInterest),
  };
};


export default parseLoanCommand;
