import React from "react"
import {Switch, Route} from "react-router";
import {OrderComfirm,ProductDetail,Login, ProductList, SignUp, SignIn, Auth, Cart,ProductEdit} from "./templates";

const Router = () => {
  return(
    <Switch>
      <Route exact path={"/login"} component={Login}/>
      <Route exact path={"/signup"} component={SignUp}/>
      <Route exact path={"/signin"} component={SignIn}/>
      <Route exact path={"/cart"} component={Cart}/>
      <Route exact path={"/ordercomfirm"} component={OrderComfirm}/>
      <Route exact path={"(/home)?"} component={ProductList}/>
      <Route path={"/products/edit(/:id)?"} component={ProductEdit}/>
      <Route exact path={"/products/:id"} component={ProductDetail}/>
      <Auth>
      </Auth>
    </Switch>
  )
}

export default Router