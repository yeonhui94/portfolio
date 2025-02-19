// import Footer from "../../container/Footer";
import Divider from "../../../components/Divider";
import styles from "../CommunityWt.module.css";
import { Outlet } from "react-router-dom";

const Resell_Community = ({ text = "사고팝니다"  , gridArea}) => {
  return (
    <div className="commwrapper"
    style={{gridArea : gridArea}}>
      <div className={styles.mainContainer}>
        <h1>{text}</h1>
        <Divider />
        <Outlet/>
      </div>
    </div>
  );
};
export default Resell_Community ;