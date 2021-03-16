import {PostTO} from '../models/PostTO.model';
import {PostPrivacy} from '../models/enums/PostPrivacy.enum';
import {userMock} from './user.model.mock';
import {TypePost} from '../models/enums/TypePost.enum';
import {PostPagination} from '../models/pagination/post.pagination';
import {SurveyTO} from '../models/surveyTO.model';

export  const postMock = new PostTO();
postMock.id = 'fsaefsaefsef';
postMock.privacy = PostPrivacy.friends_only;
postMock.description = 'firs post';
postMock.profileId = userMock.profile.id;
postMock.tipoPost = TypePost.post;
postMock.survey = new SurveyTO();
postMock.survey.options = [];
export const postsMock = [];
postsMock.push(postsMock);
postsMock.push(postsMock);
postsMock.push(postsMock);
postsMock.push(postsMock);

export const postPagination = new PostPagination();
postPagination.content = postsMock;
