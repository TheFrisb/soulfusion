export const ORDER_STATUS = {
  PENDING: 'PENDING',
  TAKE: 'TAKE',
  CALL_AGAIN: 'CALL_AGAIN',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  RETURNED: 'RETURNED',
  PAID: 'PAID',
  TRASHED: 'TRASHED',
  CANCELLED: 'CANCELLED',
}

export const ORDER_STATUS_LIST = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.TAKE,
  ORDER_STATUS.CALL_AGAIN,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.RETURNED,
  ORDER_STATUS.PAID,
  ORDER_STATUS.TRASHED,
  ORDER_STATUS.CANCELLED,
]

export const ORDER_STATUS_CSS_MAP = {
  [ORDER_STATUS.PENDING]: { bg: 'bg-status-pending', text: 'text-yellow-800' },
  [ORDER_STATUS.TAKE]: { bg: 'bg-status-take', text: 'text-purple-800' },
  [ORDER_STATUS.CALL_AGAIN]: { bg: 'bg-status-callAgain', text: 'text-green-800' },
  [ORDER_STATUS.CONFIRMED]: { bg: 'bg-status-confirmed', text: 'text-green-800' },
  [ORDER_STATUS.SHIPPED]: { bg: 'bg-status-shipped', text: 'text-gray-800' },
  [ORDER_STATUS.RETURNED]: { bg: 'bg-status-returned', text: 'text-pink-800' },
  [ORDER_STATUS.PAID]: { bg: 'bg-status-paid', text: 'text-white' },
  [ORDER_STATUS.TRASHED]: { bg: 'bg-status-trashed', text: 'text-white' },
  [ORDER_STATUS.CANCELLED]: { bg: 'bg-status-cancelled', text: 'text-white' },
}
