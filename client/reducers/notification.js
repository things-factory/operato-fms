import { ADD_NOTIFICATION, CONFIRM_NOTIFICATION } from '../actions/notification'

const INITIAL_STATE = {
  badge: 12,
  history: [
    {
      id: 1,
      type: 'SEVERE',
      title: 'Shock detected',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 2,
      type: 'SEVERE',
      title: 'Smoking detected',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 3,
      type: 'WARN',
      title: 'Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 4,
      type: 'SEVERE',
      title: 'Humidity is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 5,
      type: 'INFO',
      title: 'Came into the geofence',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 6,
      type: 'SEVERE',
      title: 'Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 7,
      type: 'SUCCESS',
      title: 'Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 8,
      type: 'WARN',
      title: 'Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 9,
      type: 'SEVERE',
      title: 'Lack of air-pressure',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 10,
      type: 'SEVERE',
      title: 'Shock detected',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 11,
      type: 'SEVERE',
      title: 'Lack of air-pressure',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      id: 12,
      type: 'SEVERE',
      title: 'Lack of air-pressure',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    }
  ]
}

function countBadge(history) {
  return history.filter(notification => !notification.confirmed).length
}

function confirm(history, id) {
  var notification = history.find(noti => noti.id === id)
  notification && (notification.confirmed = true)
}

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      var history = [...state.history, action.notification]

      return {
        badge: countBadge(history),
        history
      }

    case CONFIRM_NOTIFICATION:
      confirm(state.history, action.id)

      return {
        badge: countBadge(state.history),
        history: [...state.history]
      }

    default:
      return state
  }
}

export default notification
