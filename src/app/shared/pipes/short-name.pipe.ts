import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
 
  transform(fullName: string): any {
  
    if (!fullName) {
      return '';
    }

    const nameParts = fullName.trim().split(/\s+/);
    let initials = '';
    
    // Loop through all name parts (words)
    for (let i = 0; i < nameParts.length; i++) {
      if (nameParts[i].match(/^[a-zA-Z]/)) {
        initials += nameParts[i][0].toUpperCase();
      }

      // Stop after extracting the first letter of three words
      if (i === 2) {
        break;
      }
    }

    return initials;
}
}
