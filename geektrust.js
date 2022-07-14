const filename = process.argv[2]
const fs = require('fs')
const buffer = fs.readFileSync(filename)

let loan = {}
let payment = {}
buffer.toString().split(/\r?\n/).forEach(command => command.length && handleCommand(command.split(/\s/)))

function addLoan (loanArgs) {
  let [, bankName, borrowerName, principal, years, rate] = loanArgs
  principal = parseInt(principal)
  years = parseInt(years)
  rate = parseInt(rate)

  if (!loan[borrowerName]) {
    loan[borrowerName] = {}
  }

  if (!loan[borrowerName][bankName]) {
    loan[borrowerName][bankName] = {
      principal,
      years,
      rate,
      amount: principal + (principal * years * rate * 0.01),
      emi: Math.ceil((principal + (principal * years * rate * 0.01)) / (years * 12))
    }
  }
}

function showBalance (balanceArgs) {
  let [, bankName, borrowerName, emiNumber] = balanceArgs
  emiNumber = Math.ceil(parseFloat(emiNumber))

  const { years, emi, amount } = loan[borrowerName][bankName]

  let lumSumPaid = 0

  if (payment[borrowerName] && payment[borrowerName][bankName]) {
    lumSumPaid = payment[borrowerName][bankName].reduce((previousValue, currentValue) => {
      return currentValue.paidEmiNumber <= emiNumber ? previousValue + currentValue.lumpSumAmount : previousValue
    }, 0)
  }

  const potentialAmountPaid = (emi * emiNumber) + lumSumPaid
  const amountPaid = potentialAmountPaid < amount ? potentialAmountPaid : amount
  const potentialPendingEmiCount = years * 12 - emiNumber - Math.floor(lumSumPaid / emi)
  const pendingEmiCount = potentialPendingEmiCount < 0 ? 0 : potentialPendingEmiCount

  console.log('Balance Print - ', bankName, borrowerName, amountPaid, pendingEmiCount)

}

function addPayment (paymentArgs) {
  let [, bankName, borrowerName, lumpSumAmount, paidEmiNumber] = paymentArgs
  lumpSumAmount = parseInt(lumpSumAmount)
  paidEmiNumber = Math.ceil(parseFloat(paidEmiNumber))

  const { amount, emi } = loan[borrowerName][bankName]
  const pendingAmount = amount - (paidEmiNumber * emi)

  if (!payment[borrowerName]) {
    payment[borrowerName] = {}
  }

  if (!payment[borrowerName][bankName]) {
    payment[borrowerName][bankName] = []
  }

  if (lumpSumAmount > pendingAmount) {
    console.log('WARNING Lump Sum Amount exceed the pending Amount')
  } else {
    payment[borrowerName][bankName].push({ lumpSumAmount, paidEmiNumber })
  }
}

function handleCommand (command) {
  const [, bankName, borrowerName] = command
  const commandType = command[0].toUpperCase()

  if (!borrowerName && !bankName) {
    console.log(`Command is invalid`)
    return
  }

  if (commandType !== 'LOAN' && (!loan[borrowerName] || !loan[borrowerName][bankName])) {
    console.log(`Loan details is not present`)
    return
  }

  switch (command[0].toUpperCase()) {
    case 'LOAN':
      addLoan(command)
      break
    case 'PAYMENT':
      addPayment(command)
      break
    case 'BALANCE':
      showBalance(command)
      break
  }
}
