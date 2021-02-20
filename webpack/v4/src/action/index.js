export const ADD_COUNT = 'ADD_COUNT'
export const SUB_COUNT = 'SUB_COUNT'

let initState = {
  count: 0
}

export const addCount = data => {
  return {
    type: ADD_COUNT,
    data
  }
}

export const subCount = data => {
  return {
    type: SUB_COUNT,
    data
  }
}

