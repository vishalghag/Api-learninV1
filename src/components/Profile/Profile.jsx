import style from "./Profile.module.css";

const Profile = ({ fname, email, cardImg, deleteHandler, userInd }) => {
  return (
    <>
      <div className={style.profile}>
        <div className={style.fname}>{fname}</div>

        <div className={style.email}>{email}</div>
        <div>
          <img src={cardImg} alt="profileImg" width="180px" height="180px" />
        </div>
        <button onClick={()=>deleteHandler(userInd)}>Delete</button>
      </div>
    </>
  );
};

export default Profile;
