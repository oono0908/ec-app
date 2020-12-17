import React from "react"
import {useDispatch,useSelector} from "react-redux";
import {push} from "connected-react-router";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {deleteProduct} from "../../reducks/products/operations"
import {getUserId} from "../../reducks/users/selectors"

const ProductCard = (props) => {
  const price = props.price.toLocaleString();
  const dispatch = useDispatch();
  // const currentUserId = props.currentUser[0]

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const currentUser = uid == "xgln9h8evleLaKLOAKj1tWw6eXc2" ? true : false

  return(
    <div className="cardItem">
      <div className="cardInner" onClick={() => dispatch(push("/products/" + props.id))}>
        <img src={props.image[0].path} alt={"商品画像"}/>
        <div className="devide">
          <p>{props.name}</p>
          <p>￥{price}</p>
        </div>
      </div>
      {currentUser && (
      <div className="menuBtn">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        編集|削除
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {dispatch(push("/products/edit/" + props.id))
                            handleClose()}}>編集</MenuItem>
        <MenuItem onClick={() => {dispatch(deleteProduct(props.id))
                            handleClose()}}>削除</MenuItem>
         <MenuItem onClick={() => {dispatch(push("products/edit"))
                            handleClose()}}>商品を登録</MenuItem>
      </Menu>
    </div>
     )}
    </div>
  )
}

export default ProductCard