import {Pipe, PipeTransform} from "@angular/core";
import {StudentWithPoints} from "../model/studentWithPoints";

@Pipe({
  name: 'OrderByTotalPointsPipe'
})
export class OrderByTotalPointsPipe implements PipeTransform {

  transform(array: Array<StudentWithPoints>, args: StudentWithPoints): Array<StudentWithPoints> {

    if (!array || array === undefined || array.length === 0) return null;

    /* tslint:disable */
    array.sort((a: any, b: any) => {
      /* tslint:enable */
      if (a.totalPoints < b.totalPoints) {
        return -1;
      } else if (a.totalPoints > b.totalPoints) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
