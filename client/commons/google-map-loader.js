import ScriptLoader from './script-loader'

export default class GoogleMapLoader {
  static async load() {
    if (GoogleMapLoader.loaded) {
      return
    }
    var key = 'AIzaSyBgQZb-SFqjQBC_XTxNiz0XapejNwV9PgA'

    await ScriptLoader.load(
      'https://maps.googleapis.com/maps/api/js' + (key ? '?key=' + key : '') + '&libraries=places'
    )
    GoogleMapLoader.loaded = true
  }
}
