import React,{useState, useCallback}from "react";
import {Footer} from "/"
import {TextInput} from "../components/Uikit"
import {SendBtn} from "../components/Uikit"
import  {makeStyles} from '@material-ui/core/styles';
import {signIn} from "../reducks/users/operations"
import {useDispatch} from "react-redux"
import "../assets/SignUp.css"
import "../assets/Common.css"


const useStyles = makeStyles(() => ({
  input: {
    borderBottom: "1px solid black" ,
    fontSize: "50px",
    backgroundColor: "#EEEEEE",
    width: "70%"
  },
  inputPost: {
    width: "50%",
    borderBottom: "1px solid black" ,
    fontSize: "50px",
    backgroundColor: "#EEEEEE",
  },
  radio: {
    marginTop: "10px"
  }
}));

const SignIn = () => {
  const dispatch = useDispatch()
  const classes = useStyles();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[setEmail]);

  const inputPassword = useCallback((e) => {
      setPassword(e.target.value)
  },[setPassword]);

return(
  <>
  <div style={{paddingTop: '100px',width:"1100px",margin:"0 auto"}}>
  <div className={"marginTopMiddle"}></div>
    <h2 className="head">ログイン</h2>
    <div className={"marginTopMiddle"}></div>
      <div className="signUpWrapper">
        <TextInput
          className={classes.input} fullWidth={true}  placeholder="sample@ezweb.ne.jp"　multiline={false} required={true}
            rows={1} value={email} type={"email"} onChange={inputEmail} title={"メールアドレスを入力してください"}
        />
        <div className={"marginTopMiddle"}></div>
        <TextInput
            className={classes.input} fullWidth={true}  placeholder="sample0908"　multiline={false} required={true}
            rows={1} value={password} type={"password"} onChange={inputPassword} title={"パスワードを入力してください"}
        />
        <div className={"marginTopMiddle"}></div>
        <SendBtn
        onClick={()=>dispatch(signIn(email,password))} name={"送信"}/>
    </div>
  </div>
  </>
)
}

export default SignIn