import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import ProductCard from "../components/Products/ProductCard";
import {fetchProducts} from "../reducks//products/operations";
import {getProducts} from "../reducks/products/selectors";
import "../assets/ProductCard.css";
import ImageSwiper from "../components/Products/ImageSwiper";
import {HomeHead} from "../components/Uikit";
import {push} from "connected-react-router";



const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state)
  const products = getProducts(selector)
  const query = selector.router.location.search
  const gender = /(\?gender=male$|\?gender=female$|\?gender=kids$|\?gender=all$)/.test(query) ? query.split("?gender=")[1] : "";
  const category = /^\?category=/.test(query) ? query.split("?category=")[1] : "";
  const gnederCategory = {gender:"",type:""}
  const genderCategoryQuery = /(^\?gender=male-|^\?gender=female-|^\?gender=kids-)/.test(query) ? query.split("?gender=")[1].split("-"): "";
  const gender1 = genderCategoryQuery[0]
  const type = genderCategoryQuery[1]
        gnederCategory["gender"] = gender1
        gnederCategory["type"] = type

  useEffect(()=>{
    dispatch(fetchProducts(gender,gnederCategory))
  },[query])

  const selectMenu = (e,path) => {
    dispatch(push(path))
  }

  return (
    <section className="ListSection">
      <ul className="HomeHeadList">
        <HomeHead title={"All"} onClick={selectMenu} value={"?gender=all"}/>
        <HomeHead title={"MEN"} onClick={selectMenu} value={"?gender=male"}/>
        <HomeHead title={"WOMEN"} onClick={selectMenu} value={"?gender=female"}/>
        <HomeHead title={"KIDs"} onClick={selectMenu} value={"?gender=kids"}/>
      </ul>
      <ImageSwiper/>
      <div className="cardWrapper">
        {products.length > 0 && (
          products.map(product => (
            <ProductCard key={product.id} id={product.id} name={product.name}
            image={product.images} price={product.price}/>
          ))
        )}
      </div>
    </section>
  )
}

export default ProductList;