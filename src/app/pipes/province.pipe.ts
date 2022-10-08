import { Pipe, PipeTransform } from '@angular/core';
import { province } from "../constants/index";

@Pipe({
  name: 'province'
})

export class ProvincePipe implements PipeTransform {

  transform(value: string) {
    return province[value] ? province[value] : value;
  }

}
