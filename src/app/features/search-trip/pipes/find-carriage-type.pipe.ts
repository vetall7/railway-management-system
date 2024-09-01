import { Pipe, PipeTransform } from '@angular/core';
import { IRideCarriageData } from '@features/search-trip/models';

@Pipe({
  name: 'findCarriageType',
  standalone: true,
})
export class FindCarriageTypePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(
    carriages: IRideCarriageData[],
    typeName: string,
  ): IRideCarriageData {
    if (carriages.length > 0) {
      const currentCarriage = carriages.find(
        (carriage) => carriage.code === typeName,
      );
      return currentCarriage as IRideCarriageData;
    }
    return {} as IRideCarriageData;
  }
}
