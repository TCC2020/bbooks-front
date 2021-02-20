import {Pipe, PipeTransform} from '@angular/core';
import {BookAdTO} from '../../../models/BookAdTO.model';

@Pipe({
    name: 'filterAsync'
})
export class FilterAsyncPipe implements PipeTransform {

    transform(bookAdTo: BookAdTO[], filter: string): BookAdTO[] {
        if (!bookAdTo) {
            return bookAdTo;
        }
        return bookAdTo.filter(b => {
            if (filter === undefined || filter === null) {
                return b;
            }
            return b.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
        });
    }

}
