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
  id: number
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
  DisplayName,
  Email,
  Password
}