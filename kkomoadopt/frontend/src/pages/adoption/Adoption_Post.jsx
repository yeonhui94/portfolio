import Divider from '../../components/Divider';
import { createBrowserRouter, Form, Route, Router, Routes, useParams } from 'react-router-dom';
import React, { Component, useEffect, useState } from "react";
// import Slider from "react-slick";
import postst from '../community/Commu_post.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import postimg1 from '../community/img/postimg1.svg';
import postimg2 from '../../assets/img2/2.jpg';
import styled from 'styled-components';
import PostSlickSlide from '../community/report/PostSlickSlide';
import { filterProps } from 'framer-motion';
import Button from "../../components/Button/Button";
// import { formatDate } from "../../utils/formattedDate";

const Adoption_Post = ({ post, noticedetail }) => {

    const formattedDetails = post?.noticeDetail?.noticeContent.replace(/\n/g, '<br />');
        
    // const user = JSON.parse(localStorage.getItem("user")); 
    // const isAdmin = user?.authority === "ADMIN";
        return (

        <div className={postst.post_container}>
            <div className={postst.post_title}>
                <h3>&nbsp; {post?.noticeDetail?.noticeTitle}</h3>
            </div>
        
            <div className={postst.post_tmi}>
                <div className={postst.post_tmi1}>
                    <p className={postst.post_nick}>&nbsp;&nbsp;닉네임&nbsp;:&nbsp; 관리자</p>
                    <p className={postst.post_date}>작성일&nbsp;:&nbsp;{post?.noticeDetail?.noticeCreatedAt}</p>
                </div>
                <p className={postst.post_view}>조회수 :  {post?.noticeDetail?.noticeViewCount || 0}</p>
            </div>

            <article className={postst.post_content}>
                <div className={postst.post_content1}>

                    {/* 이미지 */}
                   {post?.noticeDetail? <PostSlickSlide className={postst.post_postimgs} 
                    img={post?.noticeDetail?.noticeImgUrl} /> : null }
                    <div className={postst.post_pettmi}>
                        <table className={`${postst.post_table} ${postst.post_tb}`}>
                            <tr className={`${postst.post_tb}`}>
                                <td className={`${postst.post_td1}`}>카테고리</td>
                            </tr>
                            <tr>
                                <td className={`${postst.post_td2}`}>{post?.noticeDetail?.noticeCategory}</td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>

                            <tr className={`${postst.post_tb}`}>
                                <td className={`${postst.post_td1}`}>품종</td>
                            </tr>
                            <tr>
                                <td className={`${postst.post_td2}`}>{post?.noticeDetail?.animalType}</td>
                            </tr>
                            <tr>
                                 <td></td>
                            </tr>
                            <tr className={`${postst.post_tb}`}>
                                <td className={`${postst.post_td1}`}>공고번호</td>
                            </tr>
                            <tr>
                                <td className={`${postst.post_td2}`}>{post?.noticeDetail?.announcementNum}</td>
                            </tr>
                             <tr>
                                 <td></td>
                            </tr>
                            <tr className={`${postst.post_tb}`}>
                                <td className={`${postst.post_td1}`}>공고마감날짜</td>
                            </tr>
                            <tr>
                                <td className={`${postst.post_td2}`}>{post?.noticeDetail?.euthanasiaDate}</td>
                            </tr>
                                </table>
                                    
                            </div>
                            </div>


                <div className={postst.post_petif}
                dangerouslySetInnerHTML={{ __html: formattedDetails }}/>
            </article>
        </div>
    )
}

export default Adoption_Post;
