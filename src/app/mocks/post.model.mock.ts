import {PostTO} from '../models/PostTO.model';
import {PostPrivacy} from '../models/enums/PostPrivacy.enum';
import {userMock} from './user.model.mock';
import {TypePost} from '../models/enums/TypePost.enum';
import {PostPagination} from '../models/pagination/post.pagination';

export  const postMock = new PostTO();
postMock.id = 'fsaefsaefsef';
postMock.privacy = PostPrivacy.friends_only;
postMock.description = 'firs post';
postMock.profileId = userMock.profile.id;
postMock.tipoPost = TypePost.post;

export const postsMock = [];
postsMock.push(postsMock);
postsMock.push(postsMock);
postsMock.push(postsMock);
postsMock.push(postsMock);

export const postPagination = new PostPagination();
postPagination.content = postsMock;
