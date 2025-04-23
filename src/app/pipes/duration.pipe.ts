import { Pipe, PipeTransform } from '@angular/core';
import { msToS } from '@src/utils/ms-to-s';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  public transform(value: number): string {
    return msToS(value);
  }
}
