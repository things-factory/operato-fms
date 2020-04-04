import { ADD_NOTIFICATION } from '../actions/notification'

const INITIAL_STATE = {
  badge: 9,
  history: [
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    },
    {
      title: 'Shock',
      message:
        'Tesla is letting go of contractors from its U.S. car and battery plants, according to three workers and correspondence shared with CNBC. The cuts affect hundreds, according to estimates from the people familiar with the move.',
      link: 'fms-report-shock/00342197',
      confirmed: false,
      timestamp: Date.now()
    }
  ]
}

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      var history = [...state.history, action.notification]
      var badge = history.filter(notification => !notification.confirmed).length

      return {
        badge,
        history
      }

    default:
      return state
  }
}

export default notification
