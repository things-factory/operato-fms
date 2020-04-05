import { ADD_NOTIFICATION, CONFIRM_NOTIFICATION } from '../actions/notification'

const INITIAL_STATE = {
  badge: 12,
  history: [
    {
      id: 1,
      type: 'SEVERE',
      title: 'Q479HI5F - Shock detected',
      message: 'The device has reported to detect a severe shock that exceed threshold.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 2,
      type: 'SEVERE',
      title: '23W7PYPP - Smoking detected',
      message: 'The device has reported to detect smoking activity inside the truck.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 3,
      type: 'WARN',
      title: '3Z4959CQ - Hard braking detected',
      message: 'The device has reported to detect a hard braking used by the driver.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 4,
      type: 'SEVERE',
      title: 'Q9NDYM39 - Humidity is out of range',
      message: 'The device has reported that the truck humidity is out of range.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 5,
      type: 'INFO',
      title: 'K8GI1U8L - Came into the geofence',
      message: 'The device has reported that the truck has crossed the geofence that is set by system.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 6,
      type: 'SEVERE',
      title: 'CPMNRI2H - Temperature is out of range',
      message:
        'The device has reported that the truck temperature is out of range. An immediate stop down is required.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 7,
      type: 'SUCCESS',
      title: 'A1U89PQA - Maintenance date renewal',
      message:
        'The truck has successfully undergone scheduled maintenance. The next maintenance date has been renewed.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 8,
      type: 'WARN',
      title: 'UNDE98H3 - Crossing speed limit',
      message: 'The device has reported to detect truck cross the speed limit.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 9,
      type: 'SEVERE',
      title: '5Q3S7ZYN - Lack of air-pressure',
      message: 'The device has reported to detect the air pressure is insufficient.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 10,
      type: 'SEVERE',
      title: 'IQYVZQ55 - Shock detected',
      message: 'The device has reported to detect a severe shock that exceed threshold.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 11,
      type: 'SEVERE',
      title: 'GS1UNJ3A - Lack of air-pressure',
      message: 'The device has reported to detect the air pressure is insufficient.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
    {
      id: 12,
      type: 'SEVERE',
      title: 'LZKDDRTO - Lack of air-pressure',
      message: 'The device has reported to detect the air pressure is insufficient.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000),
    },
  ],
}

function countBadge(history) {
  return history.filter((notification) => !notification.confirmed).length
}

function confirm(history, id) {
  var notification = history.find((noti) => noti.id === id)
  notification && (notification.confirmed = true)
}

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      var history = [...state.history, action.notification]

      return {
        badge: countBadge(history),
        history,
      }

    case CONFIRM_NOTIFICATION:
      confirm(state.history, action.id)

      return {
        badge: countBadge(state.history),
        history: [...state.history],
      }

    default:
      return state
  }
}

export default notification
