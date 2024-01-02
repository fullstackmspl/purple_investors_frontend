import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'daysfilter'
})
export class DaysfilterPipe implements PipeTransform {

    transform(days) {
        let filtr = []
        let keys = []
        let uniqueChars
        for (var k in days) keys.push(k);
        keys.forEach(day => {
            if (days[day]) {
                filtr.push(day)
            }
        });
        uniqueChars = [...new Set(filtr)];
        return uniqueChars = uniqueChars.map(el => el.substring(0, 3));
    }

}
