import {Tag} from "../models/tag";

export const tagMock = new Tag();
tagMock.id = 10;
tagMock.name = 'teste';
tagMock.color = 'azul';
tagMock.profile = null;
tagMock.books = [];

export const tagsMock = [ tagMock, tagMock, tagMock, tagMock, tagMock];
