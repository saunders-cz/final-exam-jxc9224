export interface ResponseError {
  message: string
  path: string
}

export interface BaseResponse {
  success?: boolean
  errors?: ResponseError[]
}
