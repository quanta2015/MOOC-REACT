const reducer = ( state = {}, action) => {
  switch (action.type) {
    case 'get_mooc_list':
      const lists = action.payload.data;
      const payload = JSON.parse(JSON.stringify(lists));
      return {...state, data:payload, loading: false};
    case 'get_mooc_detail':
      const detail = JSON.parse(JSON.stringify(action.payload.data))
      return {...state, detail: detail, loading: false};
    case 'set_loading':
      return {...state, detail:null, loading: true};
    default:
      return state;
  }
}

export default reducer