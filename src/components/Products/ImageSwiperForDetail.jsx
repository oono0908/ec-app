import React from "react"
import Swiper from "react-id-swiper"
import 'swiper/css/swiper.css'

const ImageSwiper = (props) => {
  const params = {
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

  const images = props.images

  return(
    <div>
      <Swiper {...params} className="swiper">
        {images.length > 0 && (
          images.map(image => (
            <div className="SwipeImageWapper" key={image.path}>
                <img src={image.path} alt="商品画像"/>
            </div>
          ))
        )}
      </Swiper>
    </div>
  )
}



export default ImageSwiper