const ONLY_WEEKDAY = Intl.DateTimeFormat('en-US', {
  weekday: 'short',
})

function formatIsoDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0]
}

export function formatOrgModDate(date: Date, startTime: string, endTime: string) {
  let dateStr = `${ONLY_WEEKDAY.format(date)} ${formatIsoDate(date)}`
  if (startTime !== '') {
    dateStr += ` ${startTime}`
  }
  if (endTime !== '') {
    dateStr += `-${endTime}`
  }
  return `<${dateStr}>`
}
