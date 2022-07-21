interface IBase {
  borrowerName: string,
  bankName: string
}

class Base implements IBase {
  borrowerName: string;
  bankName: string;

  constructor(props: IBase) {
    this.borrowerName = props.borrowerName;
    this.bankName = props.bankName;
  }
}

export default Base;
