import { getNextDay, getPreviousDay } from '@/app/common/date'

export function getPageItems(page: Date) {
  const days: Date[] = []
  addItemsOfPreviousMonth(page, days)
  addItemsOfCurrentMonth(page, days)
  return days
}

function addItemsOfPreviousMonth(page: Date, days: Date[]) {
  const weekdasOfPreviousMonth = (page.getDay() - 1 + 7) % 7
  const firstVisibleDayOfPreviousMonth = getPreviousDay(page, weekdasOfPreviousMonth)
  for (let i = 0; i < weekdasOfPreviousMonth; i++) {
    days.push(getNextDay(firstVisibleDayOfPreviousMonth, i))
  }
}

function addItemsOfCurrentMonth(page: Date, days: Date[]) {
  let iter = new Date(page)
  while (iter.getMonth() == page.getMonth()) {
    days.push(iter)
    iter = getNextDay(iter)
  }
}
