import React from "react"
import Swiper from "react-id-swiper"
import 'swiper/css/swiper.css'
import "../../assets/Swiper.css"

const ImageSwiper = () => {
  const params = {
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true,
    spaceBetween: 30
  }

 
  return(
    <div className="swiper">
      <Swiper {...params}>
        <div className="image01"></div>
        <div className="image02"></div>
        <div className="image03"></div>
      </Swiper>
    </div>
  )
}



export default ImageSwiper