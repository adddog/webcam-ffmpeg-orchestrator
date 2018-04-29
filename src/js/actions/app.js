import {
  APP_INSTRUCTIONS_SET,
} from 'actions/actionTypes';

export function setInstructions(payload = {}) {
  return {
    type: APP_INSTRUCTIONS_SET,
    payload
  };
}
