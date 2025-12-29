import type { Agenda, AgendaEvent } from '@/org/types'
import {
  LocalNotifications,
  type LocalNotificationSchema,
  type PendingLocalNotificationSchema,
} from '@capacitor/local-notifications'
import { dateFromEvent, getNextDay, getPreviousDay, now } from '../../date'

type SchedulableEvent = AgendaEvent & {
  internalId: string
  date: string
}

export async function rescheduleNotifications(agenda: Agenda) {
  const schedulableEvents = getAllEventsAsSchedulable(agenda)
  const pending = await LocalNotifications.getPending()
  cancelRemoved(schedulableEvents, pending.notifications)
  scheduleMissing(schedulableEvents, pending.notifications)
}

function getAllEventsAsSchedulable(agenda: Agenda): SchedulableEvent[] {
  return agenda.days.flatMap((day) =>
    day.events.map((event) => ({
      internalId: generateInternalId(event, day.date),
      date: day.date,
      ...event,
    })),
  )
}

async function cancelRemoved(
  events: SchedulableEvent[],
  pending: PendingLocalNotificationSchema[],
) {
  const allEventInternalIds = events.map((event) => event.internalId)
  const toCancel = pending
    .filter((notification) => !allEventInternalIds.includes(notification.extra.internalId))
    .map((notification) => ({ id: notification.id }))
  if (toCancel.length > 0) {
    await LocalNotifications.cancel({ notifications: toCancel })
  }
}

async function scheduleMissing(
  events: SchedulableEvent[],
  pending: PendingLocalNotificationSchema[],
) {
  const timestampTomorrow = getNextDay(now())
  const pendingInternalIds = pending.map((notification) => notification.extra.internalId)
  const missing = events
    .filter((event) => !pendingInternalIds.includes(event.internalId))
    .filter((event) => timestampTomorrow < dateFromEvent(event.date, event.time))
  const lastAvailableId = Math.max(...pending.map((notification) => notification.id), 0)
  if (missing.length > 0) {
    await LocalNotifications.schedule({
      notifications: missing.map((event, index) =>
        mapToNotification(event, lastAvailableId + 1 + index),
      ),
    })
  }
}

function mapToNotification(
  schedulableEvent: SchedulableEvent,
  id: number,
): LocalNotificationSchema {
  const lastBreadcrumb = schedulableEvent.breadcrumbs[schedulableEvent.breadcrumbs.length - 1]
  return {
    id,
    body: schedulableEvent.breadcrumbs.join(' » '),
    title:
      schedulableEvent.time == null
        ? lastBreadcrumb
        : `${lastBreadcrumb} - ${schedulableEvent.time}`,
    extra: {
      internalId: schedulableEvent.internalId,
    },
    schedule: {
      at: getPreviousDay(dateFromEvent(schedulableEvent.date, schedulableEvent.time)),
    },
  }
}

function generateInternalId(agendaEvent: AgendaEvent, date: string) {
  return `${date}_${agendaEvent.time ?? 'NOTIME'}_${agendaEvent.breadcrumbs.join('_')}_${agendaEvent.fileRelativePath}`
}
