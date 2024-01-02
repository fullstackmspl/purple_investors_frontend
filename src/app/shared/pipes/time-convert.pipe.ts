import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {
  date = 'Wed Mar 03 2021'
  constructor(public datePipe: DatePipe) { }

  transform(str: any, find: string = '.', replace: string = ':'): any {
    if (str && find && replace) {
      str = typeof str === 'number' ? str.toFixed(2) : str;
      str = str ? str.padStart(5, "0") : str;
      var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      str = this.date + " " + str.replace(new RegExp(escapedFind, 'g'), replace)
      try {
        return str;
      }
      catch (err) {
      }
      finally {
        return str;
      }
    }
  }
}
