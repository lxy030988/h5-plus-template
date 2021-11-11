export enum HandlerTypes {
  RegisterHandler,
  CallHandler,
  Send
}

export interface HandlerItem {
  type: HandlerTypes
  name?: string
  callback?: Function
  data?: {}
}
