export default function route(page) {
  switch (page) {
    case '':
      return '/fms-monitoring'

    case 'fms-monitoring':
      import('./pages/monitoring/monitoring')
      return page
  }
}
