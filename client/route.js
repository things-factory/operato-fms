export default function route(page) {
  switch (page) {
    case '':
      return '/fms-monitoring'

    case 'fms-monitoring':
      import('./pages/monitoring/monitoring')
      return page

    case 'fms-geofence':
      import('./pages/geofence/geofence')
      return page

    case 'fms-report':
      import('./pages/report/report')
      return page

    case 'report-delivery':
      import('./pages/report/report-delivery')
      return page

    case 'report-air-pressure':
      import('./pages/report/report-air-pressure')
      return page

    case 'report-device':
      import('./pages/report/report-device')
      return page

    case 'report-breakdown':
      import('./pages/report/report-breakdown')
      return page

    case 'report-humidity':
      import('./pages/report/report-humidity')
      return page

    case 'report-illuminance':
      import('./pages/report/report-illuminance')
      return page

    case 'report-shock':
      import('./pages/report/report-shock')
      return page

    case 'report-temperature':
      import('./pages/report/report-temperature')
      return page
  }
}
