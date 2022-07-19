import parseLoanCommand from './transformer/parseLoanCommand';
import { loanController } from './controllers/loanController';
import parsePaymentCommand from './transformer/parsePaymentCommand';
import { paymentController } from './controllers/paymentController';
import parseBalanceCommand from './transformer/parseBalanceCommand';
import { balanceController } from './controllers/balanceController';

type CommandTypes = 'LOAN' | 'PAYMENT' | 'BALANCE';

type CommandMapperModel = {
  [key in CommandTypes]: {
    dataParser: Function,
    controller: Function
  }
}

const commandMapper: CommandMapperModel = {
  LOAN: {
    dataParser: parseLoanCommand,
    controller: loanController,
  },
  PAYMENT: {
    dataParser: parsePaymentCommand,
    controller: paymentController,
  },
  BALANCE: {
    dataParser: parseBalanceCommand,
    controller: balanceController,
  },
};

export { CommandTypes, commandMapper };
