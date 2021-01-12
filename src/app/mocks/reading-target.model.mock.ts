import { userbooksMock } from './userbook.model.mock';
import { ReadingTargetTO } from './../models/readingTargetTO.model';

export const readingTargetMock = new ReadingTargetTO();
readingTargetMock.id = 'fafafa4fa';
readingTargetMock.profileId = 1;
readingTargetMock.targets = userbooksMock;
readingTargetMock.year = 2021;
