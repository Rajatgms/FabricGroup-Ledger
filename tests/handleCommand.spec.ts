import handleCommand from '../src/handleCommand';
import database from '../src/db/database';
import {
  COMMAND_NOT_SUPPORTED,
  INVALID_COMMAND,
  LOAN_EXIST,
  LOAN_NOT_FOUND,
  LUMP_SUM_EXCEED,
} from '../src/constants/constants';

console.log = jest.fn();

describe('Handle Command', () => {
  const execute = commands => commands.forEach(command => handleCommand(command.split(/\s/)));
  beforeEach(() => {
    database.loans = {};
    database.payments = {};
    jest.clearAllMocks();
  });

  it('should display error if bank or borrower details is missing', () => {
    const commands = [
      'LOAN',
      'LOAN IDIDI',
    ];
    execute(commands);
    expect(console.log).toHaveBeenCalledWith(INVALID_COMMAND);

    handleCommand(commands[1].split(/\s/));
    expect(console.log).toHaveBeenCalledWith(INVALID_COMMAND);
  });

  it('should display error if command is not supported', () => {
    const commands = [
      'TEST IDIDI Dale 10000 5 4',
    ];
    execute(commands);
    expect(console.log).toHaveBeenCalledWith(COMMAND_NOT_SUPPORTED);
  });

  describe('LOAN', () => {
    it('should add new loan', () => {
      const commands = [
        'LOAN IDIDI Dale 10000 5 4',
      ];
      execute(commands);

      expect(database.loans['Dale']['IDIDI'].noOfYears).toBe(5);
      expect(database.loans['Dale']['IDIDI'].rateOfInterest).toBe(4);
    });

    it('should not add new loan detail if already exist', () => {
      const commands = [
        'LOAN IDIDI Dale 10000 5 4',
        'LOAN IDIDI Dale 10000 15 14', ,
      ];
      execute(commands);

      expect(console.log).toHaveBeenCalledWith(LOAN_EXIST);
      expect(database.loans['Dale']['IDIDI'].noOfYears).toBe(5);
      expect(database.loans['Dale']['IDIDI'].rateOfInterest).toBe(4);
    });

    it('should display error if loan does not exist', () => {
      const commands = [
        'BALANCE IDIDI Dale 5',
      ];
      execute(commands);
      expect(console.log).toHaveBeenCalledWith(LOAN_NOT_FOUND);
    });
  });

  describe('PAYMENT', () => {
    it('should able to add multiple payment details', () => {
      const commands = [
        'LOAN IDIDI Dale 5000 1 6',
        'PAYMENT IDIDI Dale 1000 5',
        'PAYMENT IDIDI Dale 2000 6',
      ];
      execute(commands);
      expect(database.payments['Dale']['IDIDI'][0].lumpSumAmount).toBe(1000);
      expect(database.payments['Dale']['IDIDI'][0].emiNumber).toBe(5);
      expect(database.payments['Dale']['IDIDI'][1].lumpSumAmount).toBe(2000);
      expect(database.payments['Dale']['IDIDI'][1].emiNumber).toBe(6);
    });

    it('should display exceed payment error in case payment exceed pending amount', () => {
      const commands = [
        'LOAN IDIDI Dale 5000 1 6',
        'PAYMENT IDIDI Dale 1000 5',
        'PAYMENT IDIDI Dale 4000 6',
      ];
      execute(commands);
      expect(database.payments['Dale']['IDIDI'][0].lumpSumAmount).toBe(1000);
      expect(database.payments['Dale']['IDIDI'][0].emiNumber).toBe(5);
      expect(console.log).toHaveBeenCalledWith(LUMP_SUM_EXCEED);
    });
  });

  describe('BALANCE', () => {
    it('should display balance', () => {
      const commands = [
        'LOAN IDIDI Dale 10000 5 4',
        'BALANCE IDIDI Dale 5',
      ];
      execute(commands);
      expect(console.log).toHaveBeenCalledWith('IDIDI', 'Dale', 1000, 55);
    });

    it('should consider previous payment made while displaying balance', () => {
      const commands = [
        'LOAN IDIDI Dale 5000 1 6',
        'PAYMENT IDIDI Dale 1000 5',
        'BALANCE IDIDI Dale 6',
      ];
      execute(commands);
      expect(console.log).toHaveBeenCalledWith('IDIDI', 'Dale', 3652, 4);
    });

    it('should not consider future payment made while displaying balance', () => {
      const commands = [
        'LOAN IDIDI Dale 5000 1 6',
        'PAYMENT IDIDI Dale 1000 7',
        'BALANCE IDIDI Dale 6',
      ];
      execute(commands);
      expect(console.log).toHaveBeenCalledWith('IDIDI', 'Dale', 2652, 6);
    });

    it('should not receive payment greater than amount', () => {
      const commands = [
        'LOAN IDIDI Dale 5000 1 6',
        'PAYMENT IDIDI Dale 1000 5',
        'BALANCE IDIDI Dale 11',
      ];
      execute(commands);
      expect(console.log).toHaveBeenCalledWith('IDIDI', 'Dale', 5300, 0);
    });
  });

});
