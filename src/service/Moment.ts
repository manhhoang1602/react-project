import moment from "moment";

export class Moment {
  static getDate(
    _date: number | string,
    _format: string | "DD/MM/YYYY" | "DD-MM-YYYY" | "hh:ss DD/MM/YYYY" | "HH:ss DD/MM/YYYY" | "hh:ss A DD/MM/YYYY",
  ): string {
    return _format ? moment(_date).format(_format) : "___";
  }

  static getDateIncrementOrDecrement(
    _type: "INCREMENT" | "DECREMENT",
    _date: string | number,
    _numDay: number,
  ): number {
    const date = new Date(_date);
    if (_type === "INCREMENT") {
      date.setDate(date.getDate() + _numDay);
    } else {
      date.setDate(date.getDate() - _numDay);
    }
    return date.getTime();
  }

  static msToHMS(ms: number): string {
    let seconds: number = ms / 1000;
    let hours: number = parseInt((seconds / 3600).toString());
    seconds = seconds % 3600;
    let minutes = parseInt((seconds / 60).toString());
    seconds = Math.round(seconds % 60);
    console.log(hours + ":" + minutes + ":" + seconds);
    return hours + ":" + minutes + ":" + seconds;
  }
}