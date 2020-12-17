import React,{useState, useCallback}from "react";
import {TextInput,SendBtn} from "../components/Uikit"
import {useDispatch} from "react-redux"
import  {makeStyles} from '@material-ui/core/styles';
import "../assets/Inquire.css"
import {sendInquire} from "../reducks/users/operations"

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "#EEEEEE",
    width: "100%"
  }
}));

const Inquire = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();

  const [username, setUsername] = useState("")
  const [phone, setPhoneNumber] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mail, setMail] = useState("")

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
},[setUsername]);

const inputPhoneNumber = useCallback((e) => {
  setPhoneNumber(e.target.value)
},[setPhoneNumber]);

const inputTitle = useCallback((e) => {
  setTitle(e.target.value)
},[setTitle]);

const inputContent = useCallback((e) => {
  setContent(e.target.value)
},[setContent]);

const inputMail = useCallback((e) => {
  setMail(e.target.value)
},[setMail]);

const setModal = props.setModal
const cancel = () => {
  setTitle("")
  setUsername("")
  setMail("")
  setContent("")
  setPhoneNumber("")
  setModal();
}

const modalClass = props.modal == true ? "modalOpen" : "modalClose"

  return(
    <div className={modalClass}>
      <div className="inquireInner">
        <div className="inquireErement">
          <p className="inquireTitle">お問い合わせ</p>
          <TextInput
          className={classes.input} fullWidth={true}  placeholder="山田太郎" multiline={false} required={true}
          rows={1} value={username} type={"text"} onChange={inputUsername} title={"名前(フルネーム)" } fontWeight={"bold"}
          />
        <TextInput
          className={classes.input} fullWidth={true}  placeholder="1231234" multiline={false} required={true}
          rows={1} value={phone} type={"text"} onChange={inputPhoneNumber} title={"電話番号(ハイフンなし)" } fontWeight={"bold"}
          />
          <TextInput
          className={classes.input} fullWidth={true}  placeholder="例）商品の購入について" multiline={false} required={true}
          rows={1} value={title} type={"text"} onChange={inputTitle} title={"お問い合わせタイトル" } fontWeight={"bold"}
          />
          <TextInput
          className={classes.input} fullWidth={true}  placeholder="お問い合わせ内容" multiline={false} required={true}
          rows={1} value={content} type={"text"} onChange={inputContent} title={"お問い合わせ内容" } fontWeight={"bold"}
          />
          <TextInput
          className={classes.input} fullWidth={true}  placeholder="sample@ezweb.ne.jp" multiline={false} required={true}
          rows={1} value={mail} type={"text"} onChange={inputMail} title={"メールアドレスを入力してください" } fontWeight={"bold"}
          />
          <SendBtn
            onClick={()=>dispatch(sendInquire(username,phone,title,content,mail,setModal))} name={"送信"}/>
            <SendBtn 
            name={"キャンセル"} onClick={cancel}
            />
          </div>
      </div>
    </div>
  )
}

export default Inquire