import {IPublicProfilePageState} from '../state/feed-public-profile.state';
import {PublicProfilePageActionsType} from '../actions/feed-public-profile.actions';

const initialState: IPublicProfilePageState = {
    posts: [],
    loading: false,
    error: undefined,
    page: 0
};

export function reducer(
    state = initialState,
    action
): IPublicProfilePageState {
    let newFeedList = [];
    switch (action.type) {
        case PublicProfilePageActionsType.addPost:
            newFeedList = [ action.payload, ...state.posts];
            return {
                ...state,
                posts: newFeedList
            };

        case PublicProfilePageActionsType.updatePost:
            newFeedList = state.posts.map(p => {
                return p.id !== action.payload.id ? p : action.payload;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case PublicProfilePageActionsType.deletePost:
            newFeedList = state.posts.filter(p => {
                return p.id !== action.payload.id;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case PublicProfilePageActionsType.getPosts:
            newFeedList = [...state.posts, ...action.payload];
            return {
                ...state,
                posts: newFeedList
            };
        case PublicProfilePageActionsType.updatePage:
            const pageResult = action.payload;
            return {
                ...state,
                page: pageResult
            };
        case PublicProfilePageActionsType.clearRedux:
            return {
                ...state,
                page: 0,
                posts: []
            };
        default:
            return state;
    }
}
