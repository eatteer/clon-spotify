import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseArray',
})
export class TitleCaseArrayPipe implements PipeTransform {
  public transform(value: string[]): string {
    if (!value || !Array.isArray(value)) {
      return '';
    }
    return value.map((item) => this.toTitleCase(item)).join(', ');
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
