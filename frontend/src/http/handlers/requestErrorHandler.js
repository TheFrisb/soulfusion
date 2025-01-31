/**
 * @module requestErrorHandler
 */
import { HTTP_STATUS_CODES } from '@/utils/constants/http'
import { useToast } from 'vue-toastification'

const toast = useToast()

/**
 * Logs the error details to the console.
 *
 * @param {Object} error - The error object
 */
const logError = (error) => {
  if (error.response) {
    console.error('Response Error:', error.response.status, error.response.data)
  } else if (error.request) {
    console.error('Request Error: The request was made but no response was received', error.request)
  } else {
    console.error('Error:', error.message)
  }
}

/**
 * Handles request errors by logging the error and showing a toast notification with the error message.
 * The error message is determined based on the HTTP status code of the error response.
 *
 * @param {Object} error - The error object
 * @returns {Promise} A rejected promise with the error
 */
export const handleRequestError = (error) => {
  logError(error)

  if (error.response) {
    switch (error.response.status) {
      case HTTP_STATUS_CODES.BAD_REQUEST: {
        let errorMessage = error.response.data.message
        if (error.response.data.errors) {
          // loop over the dict
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            errorMessage += `\n${key}: ${value}`
          }
        }
        break
      }

      case HTTP_STATUS_CODES.UNAUTHORIZED:
      case HTTP_STATUS_CODES.FORBIDDEN:
      case HTTP_STATUS_CODES.CONFLICT:
        break

      case HTTP_STATUS_CODES.NOT_FOUND:
        toast.error("The requested resource doesn't exist.")
        break

      case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
        toast.error('Server Error: Please try again later.')
        break

      default:
        toast.error('An error occurred. Please try again.')
    }
  } else if (error.request) {
    toast.error('Request Error: The request was made but no response was received')
  } else {
    toast.error('Error:', error.message)
  }

  return Promise.reject(error)
}
