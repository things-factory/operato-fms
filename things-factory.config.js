import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'fms-monitoring',
      page: 'fms-monitoring'
    },
    {
      tagname: 'fms-report',
      page: 'fms-report'
    },
    {
      tagname: 'report-delivery',
      page: 'report-delivery'
    }
  ],
  bootstrap
}
