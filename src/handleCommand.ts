import LoanController from './controllers/loanController';
import parseLoanCommand from './transformer/parseLoanCommand';
import PaymentController from './controllers/paymentController';
import parsePaymentCommand from './transformer/parsePaymentCommand';
import BalanceController from './controllers/balanceController';
import parseBalanceCommand from './transformer/parseBalanceCommand';
import { COMMAND_NOT_SUPPORTED, INVALID_COMMAND } from './constants/constants';

const handleCommand = (command: string[]): void => {
  const [commandType, bankName, borrowerName] = command;

  if (!borrowerName && !bankName) {
    console.log(INVALID_COMMAND);
    return;
  }

  switch (commandType.toUpperCase()) {
    case 'LOAN':
      const loanInstance = new LoanController(parseLoanCommand(command));
      loanInstance.addLoan();
      break;
    case 'PAYMENT':
      const paymentInstance = new PaymentController(parsePaymentCommand(command));
      paymentInstance.addPayment();
      break;
    case 'BALANCE':
      const balanceInstance = new BalanceController(parseBalanceCommand(command));
      balanceInstance.displayBalance();
      break;
    default:
      console.log(COMMAND_NOT_SUPPORTED);
  }
};

export default handleCommand;
