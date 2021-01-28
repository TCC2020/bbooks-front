import {PostTO} from '../models/PostTO.model';
import {PostPrivacy} from '../models/enums/PostPrivacy.enum';
import {userMock} from './user.model.mock';
import {TypePost} from '../models/enums/TypePost.enum';

export  const postMock = new PostTO();
postMock.id = 'fsaefsaefsef';
postMock.privacy = PostPrivacy.friends_only;
postMock.description = 'firs post';
postMock.profileId = userMock.profile.id;
postMock.tipoPost = TypePost.post;
