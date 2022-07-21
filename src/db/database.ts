import { LoansDataModel, PaymentsDataModel } from '../models/dataModel';

type database = {
  loans: LoansDataModel,
  payments: PaymentsDataModel
}

const database: database = {
  loans: {},
  payments: {},
};

export default database;
