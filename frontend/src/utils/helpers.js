export function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}, ${date
    .getDate()
    .toString()
    .padStart(
      2,
      '0',
    )}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`
}

export function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getOrderProductName(order) {
  return order.order_item.product.name
}

export function getOrderQuantity(order) {
  return order.order_item.quantity
}

export function getOrderTotalPrice(order) {
  return order.order_item.quantity * order.order_item.price
}

export function getAgentName(agent) {
  if (!agent) {
    return 'N/A'
  }
  return `${agent.first_name} ${agent.last_name}`
}
