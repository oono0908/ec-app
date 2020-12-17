import React,{useEffect,useState} from "react"
import{useDispatch,useSelector} from "react-redux";
import{useHistory} from "react-router"
import { makeStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import guIcon from "../../image/guLogo.svg"
import "../../assets/mainHeader.css"
import Input from '@material-ui/core/Input';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Badge from "@material-ui/core/Badge"
import {getIsSignedIn,getProductsInCart,getUserId} from "../../reducks/users/selectors"
import {db} from "../../firebase/index"
import {fetchProductsInCart} from "../../reducks/users/operations"
import {HomeSearch} from "../../components/Uikit"
import {SideBar} from "../../templates/index"
import {Inquire} from "../../templates/index"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height:"70px",
    backgroundColor:"white"
  },
  length: {
    width: "1100px",
    margin: "0px auto",
    display: "flex",
    justifyContent: "space-between"
  },
  headerRight: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
}));


const Header = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  let productsInCart = getProductsInCart(selector)
  const classes = useStyles();
  const isSignedIn = getIsSignedIn(selector)
  const uid = getUserId(selector)
  const [open,setOpen] = useState(false)
  const [changeMen,setClassMen] = useState(true)
  const [changeWomen,setClassWomen] = useState(false)
  const [changeKids,setClassKids] = useState(false)
  const [categoryGender, setCategoryGender] = useState("MEN")

  useEffect(() => {
    // if (uid !== ""){
    const unsubscribe = db.collection("users").doc("xgln9h8evleLaKLOAKj1tWw6eXc2").collection("cart")
            .onSnapshot(snapshots => {
              snapshots.docChanges().forEach(change => {
                const product = change.doc.data();
                const changeType = change.type;

                switch(changeType) {
                  case "added":
                    productsInCart.push(product);
                    break
                  case "modified":
                    const index = productsInCart.findIndex(product.cartId === change.doc.id)
                    productsInCart[index] = product
                    break
                  case "removed":
                    productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
                    default:
                      break
                } 
              })
              dispatch(fetchProductsInCart(productsInCart))
            })
          
            return ()=> unsubscribe()
          // }
  },[])

  const [openMenu,setOpenMenu] = useState(false) 
  
  const menuOpen = () => {
    setOpenMenu(!openMenu)
  }

  const selectMenu = (path) => {
    dispatch(push(path))
  }
  
  const toggleMenu = (openMenu,value) => {
    if (openMenu == true) {
      setOpenMenu(!openMenu)
      dispatch(push(value))
    } else {
      dispatch(push(value))
    }
  }
  
  const changeClassToMen = (e) => {
    if (open == false){
    setOpen(true)
    }
    if (changeWomen == true){
      setClassWomen(!changeWomen)
    } 
    if (changeKids == true){
      setClassKids(!changeKids)
    } 
    setClassMen(!changeMen)
    setCategoryGender(e.target.innerText)
  }
  const changeClassToWomen = (e) => {
    if (open == false){
      setOpen(true)
      }
    if (changeMen == true){
      setClassMen(!changeMen)
    } 
    if (changeKids == true){
      setClassKids(!changeKids)
    } 
    setClassWomen(!changeWomen)
    setCategoryGender(e.target.innerText)
  }

  const changeClassToKids = (e) => {
    if (open == false){
      setOpen(true)
      }
    if (changeWomen == true){
      setClassWomen(!changeWomen)
    } 
    if (changeMen == true){
      setClassMen(!changeMen)
    } 
    setClassKids(!changeKids)
    setCategoryGender(e.target.innerText)
  }
  
  let searchOpenClass = open == true ? "open" : "close"
  let genderMen = changeMen == true ? "categoryMen" : "category"
  let genderWomen = changeWomen == true ? "categoryWomen" : "category"
  let genderKids = changeKids == true ? "categoryKids" : "category"

  let menuClass = openMenu == true ? "openMenu":"closeMenu"

  const history = useHistory();
  const query = history.location.pathname.split("/")[1]
  const url = /(signin$|signup$|^product\/edit|^products|^cart|^ordercomfirm)/.test(query) ? false:true

  const [modalChange, setModal] = useState(false)

  const openModal = () => {
    if (openMenu == true) {
      setOpenMenu(!openMenu)
      setModal(true)
    }
  }

  const setModalFunc = () => {
    setModal(false)
  }

  return (
    <div>
      <Inquire modal={modalChange} setModal={setModalFunc}/>
      <div className={menuClass}>
        <SideBar name={"ログイン"} value={"/signin"} menuChange={toggleMenu} openMenu={openMenu}/>
        <SideBar name={"ホームへ戻る"} value={"/"} menuChange={toggleMenu} openMenu={openMenu}/>
        <SideBar name={"新規会員登録"} value={"/signup"}menuChange={toggleMenu}  openMenu={openMenu}/>
        <SideBar name={"お問い合わせ"} value={"/"} menuChange={openModal} openMenu={openMenu}/>
      </div>
      <HomeSearch setOpen={setOpen}category={categoryGender} gender={categoryGender} className={searchOpenClass} tops={"トップス"} shirts={"シャツ"} pants={"パンツ"} jacket={"ジャケット"} wacth={"時計"} onClick={selectMenu}/>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.length}>
        <Typography>
          <div style={{display: "flex"}}>
              <img src={guIcon} style={{marginLeft:"10px",verticalAlign:"middle"}} alt="ジーユーアイコン" onClick={()=>dispatch(push("/home"))}/>
              {url && (
              <div><span onClick={(e) => changeClassToMen(e)} className={genderMen}>MEN</span><span onClick={(e) => changeClassToWomen(e)} className={genderWomen}>WOMEN</span><span onClick={(e) => changeClassToKids(e)} className={genderKids}>KIDs</span></div>
              )}
            </div>
          </Typography>
          <div className={classes.headerRight}>
          {url && (
          <Input defaultValue="Search"/>
          )}
            <IconButton>
              <MenuIcon onClick={menuOpen}/>
            </IconButton>
            {/* <IconButton>
              <AccountCircle />
            </IconButton> */}
            {isSignedIn && (
              <div>
              <IconButton onClick={()=> dispatch(push("/cart"))}>
              <Badge badgeContent={productsInCart.length} color="secondary">
                <AddShoppingCartIcon/>
              </Badge>
            </IconButton>
            <IconButton>
            <Badge  badgeContent={3} color="secondary">
              <FavoriteBorderIcon/>
            </Badge>
            </IconButton>
            </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default Header
