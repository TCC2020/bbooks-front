import {FeedActionsType} from '../actions/feed.actions';
import {IFeedState} from '../state/feed.state.interface';

const initialState: IFeedState = {
    posts: [],
    loading: false,
    error: undefined,
    page: 0
};

export function reducer(
    state = initialState,
    action
): IFeedState {
    let newFeedList = [];
    switch (action.type) {
        case FeedActionsType.addPost:
            newFeedList = [action.payload, ...state.posts];
            return {
                ...state,
                posts: newFeedList
            };

        case FeedActionsType.updatePost:
            newFeedList = state.posts.map(p => {
                return p.id !== action.payload.id ? p : action.payload;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case FeedActionsType.deletePost:
            newFeedList = state.posts.filter(p => {
                return p.id !== action.payload.id;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case FeedActionsType.getPosts:
            newFeedList = [...state.posts, ...action.payload];
            return {
                ...state,
                posts: newFeedList
            };
        case FeedActionsType.updatePage:
            const pageResult = action.payload;
            return {
                ...state,
                page: pageResult
            };
        case FeedActionsType.clearRedux:
            return {
                ...state,
                page: 0,
                posts: []
            };
        case FeedActionsType.deleteComment:
            newFeedList = state.posts.map(p => {
                return p.id !== action.payload.id ? p : action.payload;
            });
            return {
                ...state,
                posts: newFeedList
            };
        default:
            return state;
    }
}
