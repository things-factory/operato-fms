class Field {
  constructor(ordinal, name, symbol) {
    this._name = name
    this._ordinal = ordinal
    this._symbol = symbol
  }

  get name() {
    return this._name
  }

  get ordinal() {
    return this._ordinal
  }

  toString() {
    return this._symbol
  }
}

Field.DEGREES = new Field(0, 'degrees', '\u00B0')
Field.MINUTES = new Field(1, 'minutes', '"')
Field.SECONDS = new Field(2, 'seconds', "'")

/**
 * Represents an angle in degrees or radians. Has convenience methods to do
 * trigonometric operations, and normalizations.
 *
 * @author Sualeh Fatehi
 */

class Angle {
  constructor(degrees) {
    this._radians = (degrees * Math.PI) / 180.0
  }

  static fromRadians(radians) {
    return new Angle(radians)
  }

  static fromDegrees(degrees) {
    return Angle.fromRadians((degrees * Math.PI) / 180.0)
  }

  get degrees() {
    return (this._radians * 180.0) / Math.PI
  }

  get radians() {
    return this._radians
  }

  checkRange(range) {
    var degrees = this.degrees
    if (Math.abs(degrees) > range) {
      throw new Error(
        '' + degrees + Field.DEGREES.toString() + ' is out of range, +/-' + range + Field.DEGREES.toString()
      )
    }
  }

  sin() {
    return Math.sin(this.radians)
  }

  cos() {
    return Math.cos(this.radians)
  }

  get direction() {
    return null
  }

  getField(field) {
    /// <summary>Gets an angle field - such as degrees, minutes, or seconds. Signs
    /// will be consistent.</summmary>
    /// <param name="field">One of the field constants specifying the field to be
    ///        retrieved.</parameter>
    /// <return>Value of the specified field.</return>

    /**
     * Splits a double value into it's sexagesimal parts. Each part has the same
     * sign as the provided value.
     *
     * @param value
     *          Value to split
     * @return Split parts
     */
    function sexagesimalSplit(value) {
      var absValue
      var units
      var minutes
      var seconds
      var sign = value < 0 ? -1 : 1

      // Calculate absolute integer units
      absValue = Math.abs(value)
      units = Math.floor(absValue)
      seconds = Math.round((absValue - units) * 3600.0)

      // Calculate absolute integer minutes
      minutes = seconds / 60 // Integer arithmetic
      if (minutes == 60) {
        minutes = 0
        units++
      }
      minutes = Math.floor(minutes)

      // Calculate absolute integer seconds
      seconds = seconds % 60

      // Correct for sign
      units = units * sign
      minutes = minutes * sign
      seconds = seconds * sign

      return [units, minutes, seconds]
    }

    return sexagesimalSplit(this.degrees)[field.ordinal]
  }

  toString() {
    var absIntDegrees = Math.abs(this.getField(Field.DEGREES))
    var absIntMinutes = Math.abs(this.getField(Field.MINUTES))
    var absIntSeconds = Math.abs(this.getField(Field.SECONDS))
    var direction = this.direction

    var angleString = '' + absIntDegrees + Field.DEGREES.toString() + ' ' + absIntMinutes + Field.MINUTES.toString()
    if (absIntSeconds > 0) {
      angleString = angleString + ' ' + absIntSeconds + Field.SECONDS.toString()
    }
    if (direction === null) {
      if (this.radians < 0) {
        angleString = '-' + angleString
      }
    } else {
      angleString = angleString + ' ' + direction
    }

    return angleString
  }
}

/**
 * Represents a latitude in degrees or radians.
 *
 * @author Sualeh Fatehi
 */
class Latitude extends Angle {
  get direction() {
    if (this.radians < 0) {
      return 'S'
    } else {
      return 'N'
    }
  }
}

/**
 * Represents a longitude in degrees or radians.
 *
 * @author Sualeh Fatehi
 */
class Longitude extends Angle {
  get direction() {
    if (this.radians < 0) {
      return 'W'
    } else {
      return 'E'
    }
  }
}

export function getISO6709StringFromLatLng(lat, lng) {
  return new Latitude(lat).toString() + ' ' + new Longitude(lng).toString()
}
