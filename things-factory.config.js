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
    },
    {
      tagname: 'report-air-pressure',
      page: 'report-air-pressure'
    },
    {
      tagname: 'report-breakdown',
      page: 'report-breakdown'
    },
    {
      tagname: 'report-device',
      page: 'report-device'
    },
    {
      tagname: 'report-humidity',
      page: 'report-humidity'
    },
    {
      tagname: 'report-illuminance',
      page: 'report-illuminance'
    },
    {
      tagname: 'report-shock',
      page: 'report-shock'
    },
    {
      tagname: 'report-temperature',
      page: 'report-temperature'
    }
  ],
  bootstrap
}
