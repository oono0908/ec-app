import React,{useState, useCallback}from "react";
import {TextInput} from "../components/Uikit"
import {SendBtn} from "../components/Uikit"
import  {makeStyles} from '@material-ui/core/styles';
import {signUp} from "../reducks/users/operations"
import {useDispatch} from "react-redux"
import "../assets/SignUp.css"
import "../assets/Common.css"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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

const SignUp = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [postNumber, setPostNumber] = useState("")
  const [gender, setgender] = useState('female');
  const [addres, setAddres] = useState('');

  const handleChange = (event) => {
    setgender(event.target.value);
  };

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[setEmail]);

  const inputAddres = useCallback((e) => {
    setAddres(e.target.value)
  },[setAddres]);

  const inputPassword = useCallback((e) => {
      setPassword(e.target.value)
  },[setPassword]);

  const inputConfirmPassword = useCallback((e) => {
      setConfirmPassword(e.target.value)
  },[setConfirmPassword]);

  const inputUsername = useCallback((e) => {
      setUsername(e.target.value)
  },[setUsername]);

  const inputPostNumber = useCallback((e) => {
    setPostNumber(e.target.value)
},[setPostNumber]);

return(
  <>
  <div style={{paddingTop: '100px',width:"1100px",margin:"0 auto"}}>
  <div className={"marginTopMiddle"}></div>
    <h2 className="head">新規会員の登録</h2>
    <div className={"marginTopMiddle"}></div>
      <div className="signUpWrapper">
        <h2 className="head">新規会員の登録<span className="headSub">必須項目</span></h2>
        <TextInput
          className={classes.input} fullWidth={true}  placeholder="お名前を入力してください" multiline={false} required={true}
          rows={1} value={username} type={"text"} onChange={inputUsername} title={"名前(フルネーム)" } fontWeight={"bold"}
        />
        <TextInput
          className={classes.input} fullWidth={true}  placeholder="sample@ezweb.ne.jp"　multiline={false} required={true}
            rows={1} value={email} type={"email"} onChange={inputEmail} title={"メールアドレスを入力してください"}
        />
        <TextInput
            className={classes.input} fullWidth={true}  placeholder="sample0908"　multiline={false} required={true}
            rows={1} value={password} type={"password"} onChange={inputPassword} title={"パスワードを入力してください"}
        />
        <TextInput
            className={classes.input} fullWidth={true}  placeholder="sample0908"　multiline={false} required={true}
            rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword} title={"確認の為もう一度パスワードを入力してください"}
        />
        <TextInput
            className={classes.inputPost} fullWidth={true}  placeholder="7594103"　multiline={false} required={true}
            rows={1} value={postNumber} type={"text"} onChange={inputPostNumber} title={"郵便番号"}
        />
        <TextInput
            className={classes.input} fullWidth={true}  placeholder="東京都世田谷区..."　multiline={false} required={true}
            rows={1} value={addres} type={"text"} onChange={inputAddres} title={"住所"} helperText="番地までご記入ください"
        />
        <FormControl className={classes.radio}component="fieldset">
          <FormLabel component="legend">性別</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
            <FormControlLabel  value="female" control={<Radio  color="default"/>} label="男性" />
            <FormControlLabel  value="male" control={<Radio  color="default"/>} label="女性" />
            <FormControlLabel  value="other" control={<Radio  color="default"/>} label="その他" />
          </RadioGroup>
        </FormControl>
        <SendBtn
        onClick={()=>dispatch(signUp(email,password,confirmPassword,username,postNumber,addres))} name={"送信"}/>
    </div>
  </div>
  </>
)
}

export default SignUp