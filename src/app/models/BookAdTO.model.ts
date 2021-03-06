import {AdReviewTO} from './AdReviewTO.model';
import {BookCondition} from './enums/BookCondition.enum';

export class BookAdTO {
      id: string;
      title: string;
      condition: BookCondition;
      description: string;
      images: string[];
      isbn: string;
      userId: string;
      idBookGoogle: string;
      bookId: string;
      contact: string;
      address: string;
      review: AdReviewTO;
      isOpen: boolean;
}
