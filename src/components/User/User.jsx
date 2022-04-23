import { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import { deleteUers, getUser } from "../services/user";
import style from './User.module.css'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [page,setPage] = useState(1) 

  useEffect(() => {
    console.log("ComponentDidUpdate");
    // fetch("https://reqres.in/api/users?page=2")
    //   .then((response) => response.json())
    //   .then((user) => {
    //     setUsers(user.data);
    //   });
    //know it changes to componentDidUpdate
    setIsLoading(true)
    setIsError(false)
    getUser(page).then((userp) => {
      setUsers(userp.data);
      setIsLoading(false)
    }).catch(() => {
      setIsError(true)
      setIsLoading(false)
    })
  }, [page]);

  const submitHandler = () =>{

    setPage(page===1 ? 2 : 1)

  }

  const deleteHandler = (userInd) =>{

    console.log('delete',userInd);
    const userId = users[userInd].id;

    deleteUers(userId).then(isDelete => {
      if(isDelete){
        const item = [...users]
        item.splice(userInd,1);
        setUsers(item)
    }})

  }

  const profiles = users.map((items, index) => {
    return (
      <Profile
        key={index}
        fname={items.first_name}
        email={items.email}
        cardImg={items.avatar}
        userInd={index}
        deleteHandler={()=>{deleteHandler(index)}}
      />
    );
  });



  return (
    <>
      <h1>User's Card</h1>
      
      <h2>Page No. {page}</h2>

      {isLoading && (<div >
        <FontAwesomeIcon icon={faSpinner} className={style.spinner}></FontAwesomeIcon>
      </div>
      )}

      {!isLoading && (
        <>
      {isError && <div className={style.errMsg}>
        There is some error in Api Side
      </div>}
        </>
      )}

        {!isError && (
         <div>{profiles}</div> 
        )}

          <div>
          <button className={style.btn} onClick={submitHandler}> Page {page===1 ? 2 : 1}</button>
          </div>
        </>
  );
};

export default User;
