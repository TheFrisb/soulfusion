/**
 * @module HTTP_STATUS_CODES
 */

/**
 * Object containing HTTP status codes.
 * @typedef {Object} HTTP_STATUS_CODES
 * @property {number} BAD_REQUEST - Indicates that the server could not understand the request due to invalid syntax.
 * @property {number} UNAUTHORIZED - Indicates that the request requires user authentication.
 * @property {number} FORBIDDEN - Indicates that the server understood the request, but it refuses to authorize it.
 * @property {number} NOT_FOUND - Indicates that the server can not find the requested resource.
 * @property {number} CONFLICT - Indicates that the request could not be completed due to a conflict with the current state of the resource.
 * @property {number} INTERNAL_SERVER_ERROR - Indicates that the server encountered an unexpected condition which prevented it from fulfilling the request.
 */

export const HTTP_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}
