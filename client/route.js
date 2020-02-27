export default function route(page) {
  switch (page) {
    case '':
      return '/fms-monitoring'

    case 'fms-monitoring':
      import('./pages/monitoring/monitoring')
      return page

    case 'fms-report':
      import('./pages/report/report')
      return page

    case 'report-delivery':
      import('./pages/report/report-delivery')
      return page
  }
}
