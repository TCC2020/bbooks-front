import {PostTO} from '../../../../models/PostTO.model';

export interface IFeedState {
    posts: PostTO[];
    loading: boolean;
    error: any;
    page: number;
}
export interface IFeedStateReducer {
    feedProfile: IFeedState;
}
