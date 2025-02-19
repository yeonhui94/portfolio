import { useEffect, useState } from "react";
import wtstyles from "../CommunityWt.module.css";
import { useParams } from "react-router-dom";
import Resell_Post from "./Resell_Post";
import { readCommunityPostDetail } from "../../../stores/CommunityPostStore2/action";
import { useStore as CommentStore2 } from "../../../stores/CommentStore2/useStore";
import { useStore as CommunityPostStore2 } from "../../../stores/CommunityPostStore2/useStore";


function Resell_PostPage({ text = "사고팝니다", gridArea }) {

    const {state : communityState, actions : communityActions } = CommunityPostStore2();
    // const {state : communityState, actions : communityActions } = useStore();
    const {state : commentState, actions : commentActions} = CommentStore2();
//     const user = JSON.parse(localStorage.getItem('user'));

    // // 파라미터로 받은 id로 게시글 찾기
    const { postUid } = useParams();
    // console.log(typeof alqlPosts);

    const [ postDetail, setPostDetail ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [isAdded, setIsAdded] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

        useEffect(()=>{
            const fetchData2 = async () => {
                try {
                   await communityActions.readCommunityPostDetail(postUid);
                   await commentActions.readComments(postUid);
                } catch (error) {
                    console.error("Error fetching post detail:", error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData2();

            if(isAdded){
                setIsAdded(false);
            }
        },[postUid, isAdded]);

        
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error loading post : {error.message} </p>;


    return (
        <div className="commwrapper"
            style={{ gridArea: gridArea }}>
            {communityState &&
            <div className={wtstyles.mainContainer}>
                <h1 style={{ textAlign: "center" }}>{text}</h1>
                <Resell_Post
                 postDetail={communityState.communityPostDetail}
                 postActions={communityActions}
                 comments={communityState.communityPostDetail.comments}
                 setIsAdded={setIsAdded}
                 isAdded={isAdded}
                 user={user}/>
            </div>
            }
        </div>

    );
};


export default Resell_PostPage;