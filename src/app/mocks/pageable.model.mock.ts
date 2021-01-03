import {Pageable} from '../models/pagination/pageable.pagination';

export const pageableMock = new Pageable();
pageableMock.paged = true;
pageableMock.unpaged = false;
pageableMock.pageNumber = 10;
pageableMock.offset = 15;
