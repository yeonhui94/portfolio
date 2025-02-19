import Button from "../../Button/Button";
// import Logo from "../../logo/Logo";
import styles from "./Profile.module.css"
import logo from "../../../assets/logo.svg";

function Profile({name, text1, btnName1, btnName2, hori1, hori2, btnLink1,profileImageUrl ,profileLetter}){
    return(
        <div className={styles['profile-container']}>
            <div className={styles['profile-contents']}>
                <div className={styles.smallWrapper}>
{/*                 <div className={styles['profile-img']}> */}
{/*                     {profileImageUrl ? ( */}
{/*                         <img src={`http://localhost:8080/upload/${profileImageUrl}`} alt="" className={styles['profile-logo']} /> */}
{/*                     ) : ( */}
{/*                     <img src={logo} alt="프로필 사진" className={styles['profile-logo']} /> */}
{/*                 )} */}
{/*                 </div> */}
                <div className={styles['profile-img']}>
                    {profileImageUrl === '5123e3f8-12c3-42d3-9fad-5cbc808e0793.jpg' ? (
                        <img src={`http://localhost:8080/upload/${profileImageUrl}`} alt="" className={styles['profile-logo']} />
                    ) : (
//                     <img src={logo} alt="프로필 사진" className={styles['profile-logo']} />
                       <img src={profileImageUrl} alt="프로필 사진" className={styles['profile-logo']} />
                )}
                </div>
                <div className={styles['profile-text1']}>
                    <p className={styles['profile-name']}>{name}님</p>
                    {profileLetter ? (
                        <p className={styles['profile-text2']}>{profileLetter}</p>
                    ) : (
                    <p className={styles['profile-text2']}>{text1}</p>
                )}
                </div>
                </div>
                <div className={styles['profile-btns']}>
                <Button
                    text={btnName1}
                    horizontalPadding={hori1}
                    to={btnLink1} // Pass the link prop
                />
                <Button text={btnName2} horizontalPadding={hori2}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;