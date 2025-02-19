import styled from "styled-components";
import Divider from "../../components/Divider";
import styles from "../community/CommunityWt.module.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Adoption_Post from "./Adoption_Post";
import { formatDate } from "../../utils/formattedDate";
import { useParams } from "react-router-dom";
import { useStore as AdoptionNoticeStore2 } from "../../stores/AdoptionNoticeStore2/useStore";
import axios from "axios";

const Adopt_postpage = ({ text = "입양", gridArea }) => {
  const { state, actions } = AdoptionNoticeStore2();
  const { adoptNum, id } = useParams();
  console.log('adoptNum',adoptNum);
  const [postsDetail, setPostDetail] = useState("");
  console.log(state);

  // 페이지가 변경될 때마다 데이터 요청
  useEffect(() => {
    console.log("adoptNum",adoptNum)
    actions.getAdoptionPostDetailAction(adoptNum)
  }, [adoptNum]); // adoptNum이 변경될 때만 실행되도록 설정



  return (

    <div className="commwrapper"
      style={{ gridArea: gridArea }}>
      <div className={styles.mainContainer}>
        <h1 style={{ textAlign: "center" }}>{text}</h1>
        <Divider />
         <Adoption_Post post={state} />
      </div>
    </div>
  );
};
export default Adopt_postpage;