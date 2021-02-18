import {AdReviewTO} from './AdReviewTO.model';

export class BookAdTO {
      id: string;
      description: string;
      images: string[];
      isbn: string;
      userId: string;
      idBookGoogle: string;
      bookId: string;
      review: AdReviewTO;
}
