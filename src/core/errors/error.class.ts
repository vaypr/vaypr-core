import { id } from '../miscellanious';

export class VaprError {
  public err: Error;

  constructor(
    public id: id,
    public message: string,
    public stack?: any
  ) {
    this.err = new Error(this.message);
  }
}
