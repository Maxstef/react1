export function setInfo(info) {
  return {
    type: 'SET_INFO',
    payload: info
  }
}

export function listEmpty(bool) {
  return {
    type: 'LIST_EMPTY',
    payload: bool
  }
}

export function setCurrentDoctor(id) {
  return {
    type: 'SET_CURRENT_DOCTOR',
    payload: id
  }
}