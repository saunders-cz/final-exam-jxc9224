export type FormChangeHandler = (event: React.ChangeEvent<any>) => void

export type FormErrors<F> = {
  [K in keyof Partial<F>]: string | undefined
}

export type FormSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>
) => void

export type FormValidationSchema<F> = {
  [K in keyof Partial<F>]: (value: F[K]) => [boolean, string?]
}
