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
      tagname: 'fms-geofence',
      page: 'fms-geofence'
    },
    {
      tagname: 'fms-report',
      page: 'fms-report'
    },
    {
      tagname: 'fms-client',
      page: 'fms-client'
    },
    {
      tagname: 'fms-device',
      page: 'fms-device'
    },
    {
      tagname: 'fms-admin',
      page: 'fms-admin'
    },
    {
      tagname: 'report-delivery',
      page: 'fms-report-delivery'
    },
    {
      tagname: 'report-air-pressure',
      page: 'fms-report-air-pressure'
    },
    {
      tagname: 'report-breakdown',
      page: 'fms-report-breakdown'
    },
    {
      tagname: 'report-device',
      page: 'fms-report-device'
    },
    {
      tagname: 'report-humidity',
      page: 'fms-report-humidity'
    },
    {
      tagname: 'report-illuminance',
      page: 'fms-report-illuminance'
    },
    {
      tagname: 'report-shock',
      page: 'fms-report-shock'
    },
    {
      tagname: 'report-temperature',
      page: 'fms-report-temperature'
    }
  ],
  bootstrap
}
