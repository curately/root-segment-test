import { ZodError } from 'zod'

export interface ValidationError {
  readonly message: string
}

export interface ClientResponse<ResponseData> {
  readonly errors?: Array<ValidationError>
  readonly data?: ResponseData
}

/*
 * We cannot return plain Zod Error classes as they're not serializable.
 */
export const extractZodErrors = (error: ZodError) => {
  const formattedErrors = error.format()
  const errors: Array<ValidationError> = []

  for (const [key, value] of Object.entries(formattedErrors)) {
    if (key === '_errors') continue
    // @ts-expect-error
    if (!value || typeof value !== 'object' || !Array.isArray(value._errors)) continue
    // @ts-expect-error
    value._errors.forEach(errorMsg => errors.push({ message: errorMsg }))
  }

  if (errors.length < 1) errors.push({ message: 'Unknown Zod error.' })
  return errors
}
/**/

export const createClientErrorResponse = <ResponseData>(error: any): ClientResponse<ResponseData> => {
  if (typeof error === 'string') {
    return { errors: [{ message: error }] }
  } else if (error && Array.isArray(error.issues)) {
    // Zod error
    return { errors: extractZodErrors(error) }
  } else if (error instanceof Error) {
    return { errors: [{ message: error.message }] }
  } else {
    return { errors: [{ message: 'Unknown client validation error.' }] }
  }
}

export const createClientSuccessResponse = <ResponseData>(data: ResponseData): ClientResponse<ResponseData> => {
  return { data }
}
