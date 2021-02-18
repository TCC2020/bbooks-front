import {AdReviewTO} from './AdReviewTO.model';
import {BookCondition} from './enums/BookCondition.enum';

export class BookAdTO {
      id: string;
      condition: BookCondition;
      description: string;
      images: string[];
      isbn: string;
      userId: string;
      idBookGoogle: string;
      bookId: string;
      review: AdReviewTO;
}
