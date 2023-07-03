export const BASE_URL = 'https://api.gromova.students.nomoreparties.sbs';
// export const BASE_URL = 'http://localhost:3000'

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email})
    })
    .then((response) => {
        if (response.ok){
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`)
      
    })};

  export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email})
    })
    .then((response) => {
        if (response.ok){
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`)
    })
    
  };
  
  export function getContent(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',    
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => data)
  }
  