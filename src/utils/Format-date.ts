export const formatDate = (time: string) => {
  const date = new Date(time)
  const year = date.getUTCFullYear()
  const monthNumber = date.getUTCMonth()

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = monthNames[monthNumber]

  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')

  if (Number(hours) > 12) {
    return `${month} ${day}, ${year}`
  } else if (Number(hours) <= 12) {
    return `${month} ${day}, ${year}`
  }
}

export const formatTime = (time: string) => {
  const date = new Date(time)
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')

  if (Number(hours) > 12) {
    return `PM ${hours}:${minutes}`
  } else if (Number(hours) <= 12) {
    return `AM ${hours}:${minutes}`
  }
}
