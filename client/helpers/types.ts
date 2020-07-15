export enum Status {
  Success,
  Failed,
  None,
}

export type Instrument = {
  id: number
  code: string
  description: string
  latestPrice: string
}

export type Holding = {
  amount: string
  createdAt: string
  instrumentByInstrumentId: Instrument
}

export enum ModalOptions {
  None,
  Login,
  SignUp,
  ForgotPass,
}

export enum AccountModalOptions {
  None,
  Username,
  Email,
  Password
}