import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // Whenever calling an action creator inside of an action creator, make sure to call it inside of the dispatch.
  // Whenever a function is dispatched, thunk automatically invokes it, which is what we want.
  await dispatch(fetchPosts()); // Await makes sure we wait for fetchPosts's completion before moving on to the next line.

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); // value is only the signal that lodash needs to execute the chain
  // since there are no more lines of code below, await in that fetchUser dispatch is not necessary. We don't need to wait.
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// Comparison between classic syntax and ES2016 syntax (commented function is classic)

// export const fetchUser = function(id) {
//   return async function(dispatch) {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: "FETCH_USER", payload: response.data });
//   };
// };
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// Another approach: memoizing fetchUser. This function would be called inside of fetchUser.

// The memoized function is done separately so that it is not recreated every single time the action creator gets invoked.
// If this isn't done, every time the creator is invoked a new function is stored in memory, making memoization useless.

// This memoization is done so that we don't have to go and fetch user data per post multiple times for a single user.
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
