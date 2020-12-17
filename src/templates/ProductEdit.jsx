import React, {useState, useCallback, useEffect} from "react";
import {TextInput,SelectBox,SendBtn} from "../components/Uikit"
import "../assets/ProductEdit.css"
import  {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from "react-redux"
import {saveProduct} from "../reducks/products/operations"
import ImageArea from "../components/Products/ImageArea"
import { db } from "../firebase";

const useStyles = makeStyles(() => ({
  input: {
    fontSize: "50px",
    width: "100%"
  },
}));

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/products/edit')[1];

  const classes = useStyles();
  const   [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState(""),
        [categories,setCategories] = useState([]),
        [images, setImages] = useState([]);
      
    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const genders = [
      {id: "all", name: "すべて"},
      {id: "male", name: "男"},
      {id: "female", name: "女"},
      {id: "kids",name:"子供"}
    ]
    if(id !== ""){
      id = id.split("/")[1]
    }
    useEffect(() => {
      if(id !== "") {
          db.collection("products").doc(id).get()
            .then(snapshot => {
              const data = snapshot.data()
              setName(data.name)
              setDescription(data.description)
              setImages(data.images)
              setCategory(data.category)
              setGender(data.gender)
              setPrice(data.price)
            })
      }
    },[id])

    useEffect (() => {
      db.collection("categories")
        .orderBy("order","asc")
        .get()
        .then(snapshots => {
          const list = []
          snapshots.forEach(snapshot => {

            const data = snapshot.data()

            list.push({
              id: data.id,
              name: data.name
            })
          })
          setCategories(list)
        })
    })
  return(
    <section className="wrapperCenter">
      <h2 className="title">商品の登録と編集</h2>
      <div className="EditCenter">
        <ImageArea images={images} setImages={setImages}/>
        <TextInput
          className={classes.input} fullwidth={true} label={"商品名"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput
          className={classes.input} fullwidth={true} label={"商品説明"} multiline={true} required={true}
          onChange={inputDescription} rows={5} value={description} type={"text"}
        />
        <SelectBox
        label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
        />
        <SelectBox
        label={"性別"} required={true} options={genders} select={setGender} value={gender}
        />
        <TextInput
          className={classes.input} fullwidth={true} label={"価格"} multiline={false} required={true}
          onChange={inputPrice} rows={1} value={price} type={"number"}
        />
      </div>
      <SendBtn name={"送信"}onClick={() => dispatch(saveProduct(id,name,description,category,gender,price,images))}/>
    </section>
  )

}

export default ProductEdit