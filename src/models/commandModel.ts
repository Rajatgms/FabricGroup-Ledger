type CommandType = 'LOAN' | 'PAYMENT' | 'BALANCE';

interface CommandModel {
  bankName: string,
  borrowerName: string,
}

interface LoanModel extends CommandModel {
  principal: number,
  noOfYears: number,
  rateOfInterest: number,
}

interface PaymentModel extends CommandModel {
  lumpSumAmount: number,
  emiNumber: number,
}

interface BalanceModel extends CommandModel {
  emiNumber: number,
}

export { CommandType, CommandModel, LoanModel, PaymentModel, BalanceModel };
