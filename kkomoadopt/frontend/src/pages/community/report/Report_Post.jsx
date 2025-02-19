import Divider from '../../../components/Divider';
import { createBrowserRouter, Form, Route, Router, Routes, useNavigate, useParams } from 'react-router-dom';
import React, { Component, useState } from "react";
// import Slider from "react-slick";
import postst from '../../community/Commu_post.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import postimg1 from '../img/postimg1.svg';
import postimg2 from '../../../assets/img2/2.jpg';
import styled from 'styled-components';
import PostSlickSlide from './PostSlickSlide';
import { filterProps } from 'framer-motion';
import Comment from './Comment';
import Button from '../../../components/Button/Button';
import { deleteCommunityPost } from "../../../service/apiService";
import { formatDate } from '../../../utils/formattedDate';

const Report_Post = ({postDetail, postActions, isAdded, comments, setIsAdded, user}) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate(); // useNavigate로 페이지 이동 설정

    const deletePost = async () => {
            setIsDeleting(true);
        try {
            const response = await deleteCommunityPost(postDetail.postUid); // API 호출하여 게시글 삭제
            console.log("게시글 삭제 성공", response); 
            alert('게시물이 삭제되었습니다.');
            navigate('/community/report'); // 페이지 이동 (navigate 사용)
        } catch (error) {
            console.error("게시글 삭제 실패", error);
            alert('게시물 작성자가 아닙니다!')
        } finally {
            setIsDeleting(false);
        }
    };

    if (!postDetail) {
        // 데이터가 없으면 로딩 중 또는 오류 메시지를 표시
        return <p>Loading post details...</p>;
    }

    return (

        <div className={postst.post_container}>
            <Divider/>
            <div className={postst.post_title}>
                <h3>&nbsp; {postDetail.postTitle}</h3>
            </div>

            <div className={postst.post_tmi}>
                <div className={postst.post_tmi1}>
                    <p className={postst.post_nick}>&nbsp;&nbsp;닉네임&nbsp;:&nbsp; {postDetail.postAuthor}</p>
                    <p className={postst.post_postnum}> 글번호 &nbsp;:&nbsp; {postDetail.postId}</p>
                    <p className={postst.post_date}>작성일&nbsp;:&nbsp; {formatDate(postDetail.postCreatedAt)} </p>
                </div>
                <p className={postst.post_view}>조회수 : {postDetail.postViewCount}</p>
            </div>

            
            <article className={postst.post_content}>
                <div className={postst.post_content1}>
                    
                    {/* 이미지 */}
                    {!postDetail.postImgUrl ? (  // post.img가 없는 경우 "이미지 없음" 표시
                    ""
                    ) : (
                    <PostSlickSlide className={postst.post_postimgs} img={postDetail.postImgUrl} /> 
                    )}
                    <div className={postst.post_article} dangerouslySetInnerHTML={{ __html: postDetail.postContent }}
                    />
                </div>
                <Comment className={postst.post_petif} postActions={postActions} postDetail={postDetail} comments={comments} isAdded={isAdded} setIsAdded={setIsAdded} user={user} />
                <div className={postst.buttonwrap}>
                    <Button text={"수정"} width={"100px"} fontSize={"20px"} />
                    <Button
                        text={"삭제"}
                        width={"100px"}
                        fontSize={"20px"} 
                        onClick={deletePost}  // 삭제 버튼 클릭 시 deletePost 함수 실행
                        // disabled={isDeleting}
                    />
                </div>
            </article>
        </div>
    )
}

export default Report_Post;
