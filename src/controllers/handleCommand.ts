import { loansData } from '../db/data';
import { commandMapper } from '../mapper';

const handleCommand = (command: string[]): void => {
  const [commandType, bankName, borrowerName] = command;

  if (!borrowerName && !bankName) {
    console.log(`Command is invalid`);
    return;
  }

  if (commandType !== 'LOAN' && (!loansData[borrowerName] || !loansData[borrowerName][bankName])) {
    console.log(`Loan details is not present`);
    return;
  }

  const { dataParser, controller } = commandMapper[commandType.toUpperCase()];

  if (dataParser && controller) {
    controller(dataParser(command));
  } else {
    console.log(`Command is not supported`);
  }
};

export default handleCommand;
