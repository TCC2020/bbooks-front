import {IFeedMainState} from '../state/feed-main.state';
import {FeedMainActionsType} from '../actions/feed-main.actions';


const initialState: IFeedMainState = {
    posts: [],
    loading: false,
    error: undefined,
    page: 0
};

export function reducer(
    state = initialState,
    action
): IFeedMainState {
    let newFeedList = [];
    switch (action.type) {
        case FeedMainActionsType.addPost:
            newFeedList = [ action.payload, ...state.posts];
            return {
                ...state,
                posts: newFeedList
            };

        case FeedMainActionsType.updatePost:
            newFeedList = state.posts.map(p => {
                return p.id !== action.payload.id ? p : action.payload;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case FeedMainActionsType.deletePost:
            newFeedList = state.posts.filter(p => {
                return p.id !== action.payload.id;
            });
            return {
                ...state,
                posts: newFeedList
            };
        case FeedMainActionsType.getPosts:
            newFeedList = [...state.posts, ...action.payload];
            return {
                ...state,
                posts: newFeedList
            };
        case FeedMainActionsType.updatePage:
            const pageResult = action.payload;
            return {
                ...state,
                page: pageResult
            };
        case FeedMainActionsType.clearRedux:
            return {
                ...state,
                page: 0,
                posts: []
            };
        default:
            return state;
    }
}