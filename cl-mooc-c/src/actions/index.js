import axios from 'axios';

export function fetchMoocList() {
  const response = axios.get('http://108.61.191.100:4000/getMoocList');

  return {
    type: 'get_mooc_list',
    payload: response
  }
}

export function fetchMoocDetail(id) {
  console.log('pass:' + id)
  // const response = axios.post('http://108.61.191.100:4000/getMoocDetail',{id: id});
  const response = axios.get('http://108.61.191.100:4000/getMoocDetail', {params:{id: id}});

  return {
    type: 'get_mooc_detail',
    payload: response
  }
}

export function setLoading() {
  return {
    type: 'set_loading'
  }
}

