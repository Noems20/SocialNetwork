import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        let comments = state.scream.comments;
        state.scream = action.payload;
        state.scream.comments = comments;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM: {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      let mutatedScreams = state.screams.slice();
      mutatedScreams.splice(index, 1);
      return {
        ...state,
        screams: [...mutatedScreams],
      };
    }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT: {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      /////// Looks for the scream, just like in "like" and "unlike" reducers
      let updatedScreams = JSON.parse(JSON.stringify(state.screams));
      ///// deep copy of the array - simply spreading it won't work
      updatedScreams[index].commentCount += 1;
      return {
        ...state,
        screams: updatedScreams,
        scream: {
          ...state.scream,
          comments: [action.payload.comment, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1,
        },
      };
    }
    default:
      return state;
  }
};

export default dataReducer;
