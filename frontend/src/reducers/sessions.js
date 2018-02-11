import { GET_SESSIONS } from '../actions'

const initialState = [];


const sessions = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS:
      return action.response;
    default:
      return state;
  }
}

export default sessions;
