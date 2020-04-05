import { ADD_NOTIFICATION, CONFIRM_NOTIFICATION } from '../actions/notification'

const INITIAL_STATE = {
  badge: 12,
  history: [
    {
      id: 1,
      type: 'SEVERE',
      title: 'Q479HI5F - Shock detected',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 2,
      type: 'SEVERE',
      title: '23W7PYPP - Smoking detected',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 3,
      type: 'WARN',
      title: '3Z4959CQ - Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 4,
      type: 'SEVERE',
      title: 'Q9NDYM39 - Humidity is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 5,
      type: 'INFO',
      title: 'K8GI1U8L - Came into the geofence',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 6,
      type: 'SEVERE',
      title: 'CPMNRI2H - Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 7,
      type: 'SUCCESS',
      title: 'A1U89PQA - Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 8,
      type: 'WARN',
      title: 'UNDE98H3 - Temperature is out of range',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 9,
      type: 'SEVERE',
      title: '5Q3S7ZYN - Lack of air-pressure',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 10,
      type: 'SEVERE',
      title: 'IQYVZQ55 - Shock detected',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 11,
      type: 'SEVERE',
      title: 'GS1UNJ3A - Lack of air-pressure',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
    },
    {
      id: 12,
      type: 'SEVERE',
      title: 'LZKDDRTO - Lack of air-pressure',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now() - ~~(Math.random() * 100000000)
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
