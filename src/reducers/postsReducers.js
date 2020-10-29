export default (state = [], action) => {
  // Maintains a list of posts fetched from the JsonPlaceholder API.
  // If we ever see an action that isnt fetch_posts, we just return the state.
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return state;
  }
};
