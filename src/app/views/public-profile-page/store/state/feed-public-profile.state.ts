import {PostTO} from '../../../../models/PostTO.model';

export interface IPublicProfilePageState {
    posts: PostTO[];
    loading: boolean;
    error: any;
    page: number;
}
export interface IPublicProfilePageStateReducer {
    PublicProfilePage: IPublicProfilePageState;
}
