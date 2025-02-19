import { useEffect, useState } from "react";
import wtstyles from "../CommunityWt.module.css";
import Adopt_reviewPost from "./Adopt_reviewPost";
import { useParams } from "react-router-dom";
import { readCommunityPostDetail } from "../../../stores/CommunityPostStore2/action";
import { useStore as CommunityPostStore2 } from "../../../stores/CommunityPostStore2/useStore";

function Adopt_reviewPostPage({ text = "입양 후기", gridArea }) {
    const { state: communityState, actions: communityActions } = CommunityPostStore2();
    const user = JSON.parse(localStorage.getItem('user'));
    const { postUid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 커뮤니티 포스트 데이터 불러오기
                await communityActions.readCommunityPostDetail(postUid);
            } catch (error) {
                console.error("Error fetching post detail:", error);
                setError(error);
            } finally {
                // 로딩 상태 종료
                setLoading(false);
            }
        };

        fetchData();

        if(isAdded){
            setIsAdded(false);
        }
    }, [postUid, isAdded]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading post : {error.message} </p>;


    return (
        <div className="commwrapper"
            style={{ gridArea: gridArea }}>
            {communityState &&
                <div className={wtstyles.mainContainer}>
                    <h1 style={{ textAlign: "center" }}>{text}</h1>
                    <Adopt_reviewPost
                        postDetail={communityState.communityPostDetail}
                        postActions={communityActions}
                        comments={communityState.communityPostDetail.comments}
                        setIsAdded={setIsAdded}
                        isAdded={isAdded}
                        user={user}
                        />
                </div>
            }
        </div>
    );
};


export default Adopt_reviewPostPage;