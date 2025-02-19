import styled from "styled-components";
import Divider from "../../components/Divider";
import styles from "../community/CommunityWt.module.css";
import { Outlet } from "react-router-dom";

const Adopt_header = ({ text = "입양"  , gridArea}) => {
  return (
    <div className="commwrapper"
    style={{gridArea : gridArea}}>
      <div className={styles.mainContainer}>
        <h1 style={{textAlign : "center"}}>{text}</h1>
        <Divider />
        <Outlet/>
      </div>
    </div>
  );
};
export default Adopt_header;