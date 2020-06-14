export enum Status {
  Success,
  Failed,
  None,
}

export type Instrument = {
  code: string
  description: string
  id: number
}

export type Holding = {
  amount: string
  createdAt: string
  instrumentByInstrumentId: {
    code: string
    description: string
    id: number
  }
}
