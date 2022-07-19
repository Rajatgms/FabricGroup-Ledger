type LoanDataModel = {
  principal: number,
  noOfYears: number,
  rateOfInterest: number,
  amount: number,
  emi: number
}

type PaymentDataModel = {
  lumpSumAmount: number,
  emiNumber: number,
}

interface LoansDataModel {
  [key: string]: {
    [key: string]: LoanDataModel
  };
}

interface PaymentsDataModel {
  [key: string]: {
    [key: string]: PaymentDataModel[]
  };
}

export { LoansDataModel, PaymentsDataModel };
