import React,{useState, useEffect, useCallback}  from "react"
import {db,FirebaseTimestamp} from "../firebase"
import HTMLReactParser from "html-react-parser"
import {useDispatch, useSelector} from "react-redux";
import "../assets/ProductDetail.css"
import ImageSwiper from "../components/Products/ImageSwiperForDetail.jsx"
import Radio from "../components/Products/Radio"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {addProductToCart} from "../reducks/users/operations"
import {getIsSignedIn} from "../reducks/users/selectors"
import {push} from "connected-react-router"

const returnCodeToBr = (text) => {
  if (text === "") {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g,"<br/>"))
  }
}

const ProductDetail = () => {
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname;
  const id = path.split("/products/")[1]
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [color, setColor] = useState("赤")
  const [size, setSize] = useState("SS")
  const [quantity, setQuantity] = useState('1');

  const colorChange = useCallback((event) => {
    setColor(event.target.value)
  },[setColor])

  const sizeChange = useCallback((event) => {
    setSize(event.target.value)
  },[setSize])

  const quantityChange = useCallback((event) => {
    setQuantity(event.target.value)
  },[setQuantity])


  useEffect(()=>{
    db.collection("products").doc(id).get()
    .then(doc => {
      const data = doc.data();
      setProduct(data)
    })
  },[])
  
  const isSignedIn = getIsSignedIn(selector)

  const addProduct = useCallback(() => {

    if (isSignedIn == ""){
      const ret = window.confirm('注文するにはには会員登録するか、ログインする必要があります。')
      if (!ret){
        return false
      } else {
        dispatch(push("/signin"))
        return
      }

    } 
    const timestamp = FirebaseTimestamp.now()
    dispatch(addProductToCart({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size:size,
      color: color,
      images: product.images,
    }))
  })

  
return (
  <section>
    {product && (
      <div className="detailWrapper">
        <div className="detailleft">
        <ImageSwiper images={product.images}/>
        </div>
        <div className="detailRight">
          <h2><span className="fontLarge">{product.name}</span></h2>
          <p className="marginTop"></p>
          <p><span className="fontLarge">￥{product.price.toLocaleString()}</span></p>
          <p className="marginTop"></p>
          <p className="radioTitle"><span className="fontBold">カラー:</span>{color}</p>
          <p className="marginTop"></p>
          <div className="radioWrapper">
            <Radio
              className={color === "赤" ? ({a: "cheked",b: "red"}):({b:"red"})}
              color={color}
              onChange={colorChange}
              value={"赤"}
              name={"radio"}
            />
            <Radio
              className={color === "緑" ? ({a: "cheked",b: "green"}):({b:"green"})}
              color={color}
              onChange={colorChange}
              value={"緑"}
              name={"radio"}
            />
            <Radio
              className={color === "黄色" ? ({a: "cheked",b: "yellow"}):({b:"yellow"})}
              color={color}
              onChange={colorChange}
              value={"黄色"}
              name={"radio"}
            />
            <Radio
              className={color === "黒" ? ({a: "cheked",b: "black"}):({b:"black"})}
              color={color}
              onChange={colorChange}
              value={"黒"}
              name={"radio"}
            />
            <Radio
              className={color === "白" ? ({a: "cheked",b: "white"}):({b:"white"})}
              color={color}
              onChange={colorChange}
              value={"白"}
              name={"radio"}
            />
          </div>
          <p className="marginTop"></p>
          <p className="radioTitle"><span className="fontBold">サイズ:</span>{size}</p>
          <p className="marginTop"></p>
          <div className="radioWrapper">
            <Radio
              className={size === "SS" ? ({a: "chekedSize",b: "sizeRadioInner"}):({b:"sizeRadioInner"})}
              color={size}
              onChange={sizeChange}
              value={"SS"}
              name={"sizeRadio"}
              size={"size"}
            />
            <Radio
              className={size === "S" ? ({a: "chekedSize",b: "sizeRadioInner"}):({b:"sizeRadioInner"})}
              inner={"inner"}
              color={size}
              onChange={sizeChange}
              value={"S"}
              name={"sizeRadio"}
              size={"size"}
            />
            <Radio
              className={size === "M" ? ({a: "chekedSize",b: "sizeRadioInner"}):({b:"sizeRadioInner"})}
              inner={"inner"}
              color={size}
              onChange={sizeChange}
              value={"M"}
              name={"sizeRadio"}
              size={"size"}
            />
            <Radio
              className={size === "L" ? ({a: "chekedSize",b: "sizeRadioInner"}):({b:"sizeRadioInner"})}
              color={size}
              onChange={sizeChange}
              value={"L"}
              name={"sizeRadio"}
              size={"size"}
            />
            <Radio
              className={size === "LL" ? ({a: "chekedSize",b: "sizeRadioInner"}):({b:"sizeRadioInner"})}
              color={size}
              onChange={sizeChange}
              value={"LL"}
              name={"sizeRadio"}
              size={"size"}
            />
          </div>
          <p className="marginTop"></p>
          <div className="quantity">
            <p><span className="fontBold">数量:</span></p>
              <FormControl>
                  <Select
                    labelId="quatity-select-label"
                    value={quantity}
                    onChange={quantityChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
              </FormControl>
            </div>
            <p className="marginTop"></p>
          <p>{returnCodeToBr(product.description)}</p>
          <div className="commonAdd addCart" onClick={addProduct}>カートに追加</div>
          <div className="commonAdd favorite">お気に入りに追加</div>
        </div>
      </div>
    )}
  </section>
)
}

export default ProductDetail