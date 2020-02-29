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

    case 'fms-device':
      import('./pages/device/device')
      return page

    case 'fms-client':
      import('./pages/client/client')
      return page

    case 'fms-admin':
      import('./pages/admin/admin')
      return page

    case 'fms-report-delivery':
      import('./pages/report/report-delivery')
      return page

    case 'fms-report-air-pressure':
      import('./pages/report/report-air-pressure')
      return page

    case 'fms-report-device':
      import('./pages/report/report-device')
      return page

    case 'fms-report-breakdown':
      import('./pages/report/report-breakdown')
      return page

    case 'fms-report-humidity':
      import('./pages/report/report-humidity')
      return page

    case 'fms-report-illuminance':
      import('./pages/report/report-illuminance')
      return page

    case 'fms-report-shock':
      import('./pages/report/report-shock')
      return page

    case 'fms-report-temperature':
      import('./pages/report/report-temperature')
      return page
  }
}
