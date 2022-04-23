export const getUser = (page=1) => {
    return fetch(`https://reqres.in/api/users?page=${page}`).then((response) =>
      response.json()
    );
  };

  export const deleteUers = (userInd) =>{
      const apiConfig = {
        method:'DELETE'
      }
      return fetch(`https://reqres.in/api/users/${userInd}`,apiConfig) 
      .then(res =>res.status === 204) //whenever response come check by using console.log first to get status res =>{console.log{res}}
  }