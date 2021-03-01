import {IFeedGroupState} from '../state/feed-group.state';
import {FeedGroupActionsType} from '../actions/feed-group.actions';

const initialState: IFeedGroupState = {
    posts: [],
    loading: false,
    error: undefined,
    page: 0
};

export function reducer(
    state = initialState,
    action
): IFeedGroupState {
    let newFeedList = [];
    switch (action.type) {
        case FeedGroupActionsType.addPost:
            newFeedList = [ action.payload, ...state.posts];
            return {
                ...state,
                posts: newFeedList
            };

        case FeedGroupActionsType.updatePost:
            newFeedList = state.posts.map(p => {
                return p.id !== action.payload.id ? p : action.payload;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case FeedGroupActionsType.deletePost:
            newFeedList = state.posts.filter(p => {
                return p.id !== action.payload.id;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case FeedGroupActionsType.getPosts:
            newFeedList = [...state.posts, ...action.payload];
            return {
                ...state,
                posts: newFeedList
            };
        case FeedGroupActionsType.updatePage:
            const pageResult = action.payload;
            return {
                ...state,
                page: pageResult
            };
        case FeedGroupActionsType.clearRedux:
            return {
                ...state,
                page: 0,
                posts: []
            };
        default:
            return state;
    }
}
