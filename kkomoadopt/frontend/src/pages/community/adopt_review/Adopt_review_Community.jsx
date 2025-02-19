import styled from "styled-components";
// import Header from "../container/header/Header";
// import Footer from "../../container/Footer";
import Divider from "../../../components/Divider";
import styles from "../CommunityWt.module.css";
import { Outlet } from "react-router-dom";

const Adopt_review_Community = ({ text = "입양후기"  , gridArea}) => {
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
export default Adopt_review_Community;
