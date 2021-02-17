import {PostTO} from '../../../../models/PostTO.model';

export interface IFeedMainState {
    posts: PostTO[];
    loading: boolean;
    error: any;
    page: number;
}
export interface IFeedMainStateReducer {
    feed: IFeedMainState;
}
