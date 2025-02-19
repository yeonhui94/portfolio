// import Footer from "../../container/Footer";
import Divider from "../../../components/Divider";
import wtstyles from "../CommunityWt.module.css";
import { Outlet, useParams } from "react-router-dom";
import Report_Post from "./Report_Post";
import { useEffect, useState } from "react";
import { useStore } from "../../../stores/CommunityPostStore2/useStore";
import { useStore as CommentStore2 } from "../../../stores/CommentStore2/useStore";
import { useStore as CommunityPostStore2 } from "../../../stores/CommunityPostStore2/useStore";
import { readCommunityPostDetail } from "../../../stores/CommunityPostStore2/action";

const Report_postpage = ({ text = "신고합니다"  , gridArea}) => {

  const {state : communityState, actions : communityActions } = CommunityPostStore2();
  const {state : commentState, actions : commentActions} = CommentStore2();
  const { postUid } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [ postDetail, setPostDetail ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            try {
               await communityActions.readCommunityPostDetail(postUid);

            } catch (error) {
                console.error("Error fetching post detail:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        if(isAdded){
          setIsAdded(false);
      }
    },[postUid, isAdded]);
  

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error loading post : {error.message} </p>;


  return (
    <div className="commwrapper"
    style={{gridArea : gridArea }}>
      <div className={wtstyles.mainContainer}>
        <h1 style={{textAlign :"center"}}>{text}</h1>
        <Report_Post postDetail={communityState.communityPostDetail}
         postActions={communityActions}
         comments={communityState.communityPostDetail.comments}
         setIsAdded={setIsAdded}
         isAdded={isAdded}
         user={user}/>
      </div>
    </div>
  );
};
export default Report_postpage ;