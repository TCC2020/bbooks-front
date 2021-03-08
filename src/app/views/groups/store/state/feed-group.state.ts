import {PostTO} from '../../../../models/PostTO.model';

export interface IFeedGroupState {
    posts: PostTO[];
    loading: boolean;
    error: any;
    page: number;
}
export interface IFeedGroupStateReducer {
    feedGroup: IFeedGroupState;
}
