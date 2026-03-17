import { getNextDay, getPreviousDay } from '@/app/common/date'

export function getPageItems(page: Date) {
  const days: Date[] = []
  addItemsOfPreviousMonth(page, days)
  addItemsOfCurrentMonth(page, days)
  addItemsOfNextMonth(page, days)
  return days
}

function addItemsOfPreviousMonth(page: Date, days: Date[]) {
  const weekdaysOfPreviousMonth = (page.getDay() - 1 + 7) % 7
  const firstVisibleDayOfPreviousMonth = getPreviousDay(page, weekdaysOfPreviousMonth)
  for (let i = 0; i < weekdaysOfPreviousMonth; i++) {
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

function addItemsOfNextMonth(page: Date, days: Date[]) {
  let iter = getNextDay(new Date(days[days.length - 1]))
  while (iter.getDay() != 1) {
    days.push(iter)
    iter = getNextDay(iter)
  }
}
