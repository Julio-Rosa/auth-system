import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeInvalidChars'
})
export class RemoveInvalidCharsPipe implements PipeTransform {
   value = "[Admin]"
  transform(value: string, ...args: unknown[]): unknown {
   
   
     let removeFirst =  value.replace('[','');
     let newValue = removeFirst.replace(']','');
    return newValue;
  }

}
