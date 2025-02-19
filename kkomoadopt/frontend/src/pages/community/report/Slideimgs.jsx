import React, { Component } from "react";
import Slider from "react-slick";
import postst from '../Commu_post.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import postimg1 from '../img/postimg1.svg';
import postimg2 from '../../../assets/img2/2.jpg';

function Slideimgs ( ) {

    const slideimg = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
      };

    return (
        // <div className={postst.postimgs}>
        <Slider {...slideimg} className={postst.slick-slider}>
            {/* <div className={postst.post_postimg1}/> */}
            <div className={postst.imgbox}>
                <img src={postimg1}/>
            </div>
            <div>
                <img src={postimg1}/>
            </div>
            <div>
                <img src={postimg1}/>
            </div>
            <div>
                <img src={postimg1}/>
            </div>
            {/* <div className={postst.post_postimg2}/>                             
            <div className={postst.post_postimg3}/>           
            <div className={postst.post_postimg4}/>            */}
        </Slider>
        // </div>
    )
}

export default Slideimgs;