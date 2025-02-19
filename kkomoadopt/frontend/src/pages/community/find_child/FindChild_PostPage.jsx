import { useEffect, useState } from "react";
import img1 from './missingdog.jpg';
import wtstyles from "../CommunityWt.module.css";
import FindChild_Post from "./FindChild_Post";
import { useParams } from "react-router-dom";
import { useStore as CommunityPostStore2 } from "../../../stores/CommunityPostStore2/useStore";
// import { useStore as CommentStore2 } from "../../../stores/CommentStore2/useStore";
import { useStore } from "../../../stores/CommunityPostStore2/useStore";
import { readCommunityPostDetail } from "../../../stores/CommunityPostStore2/action";

function FindChild_PostPage({ text = "아이를 찾습니다", gridArea }) {

    const { state: communityState, actions: communityActions } = CommunityPostStore2();
    //  const {state : commentState, actions : commentActions} = CommentStore2();

    const { postUid } = useParams();
    // console.log(typeof alqlPosts);
    const user = JSON.parse(localStorage.getItem('user'));
    const [postDetail, setPostDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await communityActions.readCommunityPostDetail(postUid);
                // await commentActions.readComments(postUid);
            } catch (error) {
                console.error("error fetching post detail", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        if (isAdded) {
            setIsAdded(false);
        }
    }, [postUid, isAdded]); // 의존성 배열에 `postUid`, `isAdded`만 넣어 무한 렌더링 방지

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading post : {error.message} </p>;

    return (
        <div className="commwrapper" style={{ gridArea: gridArea }}>
            {communityState &&
                <div className={wtstyles.mainContainer}>
                    <h1 style={{ textAlign: "center" }}>{text}</h1>
                    <FindChild_Post
                        postDetail={communityState.communityPostDetail}
                        postActions={communityActions}
                        comments={communityState.communityPostDetail.comments}
                        setIsAdded={setIsAdded}
                        isAdded={isAdded}
                        user={user} />
                </div>
            }
        </div>
    );
};

export default FindChild_PostPage;
