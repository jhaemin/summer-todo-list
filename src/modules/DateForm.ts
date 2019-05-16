export default class DateForm {
  constructor() {}

  private static padZero(number: number): string {
    return (number<10?'0':'') + number
  }

  static now() {
    let date = new Date()
    let YYYY = date.getFullYear().toString()
    let MM = this.padZero(date.getMonth() + 1)
    let dd = this.padZero(date.getDate())
    let hh = this.padZero(date.getHours())
    let mm = this.padZero(date.getMinutes())
    let ss = this.padZero(date.getSeconds())

    return YYYY + MM + dd + hh + mm + ss
  }
}