import { ADD_NOTIFICATION, CONFIRM_NOTIFICATION } from '../actions/notification'

const INITIAL_STATE = {
  badge: 12,
  history: [
    {
      id: 1,
      type: 'SEVERE',
      title: 'Shock detected',
      message: 'The device has reported to detect a severe shock that exceed threshold.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 2,
      type: 'SEVERE',
      title: 'Smoking detected',
      message: 'The device has reported to detect smoking activity inside the truck.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 3,
      type: 'WARN',
      title: 'Hard braking detected',
      message: 'The device has reported to detect a hard braking used by the driver.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 4,
      type: 'SEVERE',
      title: 'Humidity is out of range',
      message: 'The device has reported that the truck humidity is out of range.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 5,
      type: 'INFO',
      title: 'Came into the geofence',
      message: 'The device has reported that the truck has crossed the geofence that is set by system.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 6,
      type: 'SEVERE',
      title: 'Temperature is out of range',
      message:
        'The device has reported that the truck temperature is out of range. An immediate stop down is required.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 7,
      type: 'SUCCESS',
      title: 'Maintenance date renewal',
      message:
        'The truck has successfully undergone scheduled maintenance. The next maintenance date has been renewed.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 8,
      type: 'WARN',
      title: 'Crossing speed limit',
      message: 'The device has reported to detect truck cross the speed limit.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 9,
      type: 'SEVERE',
      title: 'Lack of air-pressure',
      message: 'The device has reported to detect the air pressure is insufficient.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 10,
      type: 'SEVERE',
      title: 'Shock detected',
      message: 'The device has reported to detect a severe shock that exceed threshold.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 11,
      type: 'SEVERE',
      title: 'Lack of air-pressure',
      message: 'The device has reported to detect the air pressure is insufficient.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
    },
    {
      id: 12,
      type: 'SEVERE',
      title: 'Lack of air-pressure',
      message: 'The device has reported to detect the air pressure is insufficient.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now(),
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
