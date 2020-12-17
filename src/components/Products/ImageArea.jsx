import React,{useCallback} from "react"
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {storage} from "../../firebase/index"
import ImagePreview from "./ImagePreview"

const ImageArea = (props) => {

  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm('この画像を削除しますか？')
    if (!ret) {
        return false
    } else {
        const newImages = props.images.filter(image => image.id !== id)
        props.setImages(newImages);
        return storage.ref('images').child(id).delete()
    }
}, [props.images])

  const uploadImage = useCallback((event) => {
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg" });

    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N=16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

    const uploadRef = storage.ref('images').child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newImage = {id: fileName, path: downloadURL};
            props.setImages((prevState => [...prevState, newImage]))
        });
    }).catch(() => {
    });
}, [props.setImages])
  
  return (
    <div className="imageWrapper">
      <div className="IconRight">
        <p>商品画像を登録する</p>
        <IconButton>
          <label>
            <AddAPhotoIcon/>
            <input className="file" type="file" onChange={(event) => uploadImage(event)}/>
          </label>
        </IconButton>
      </div>
      <div className="imageList">
        {props.images.length > 0 && (
          props.images.map(image => <ImagePreview delete={deleteImage} path={image.path} key={image.id} id={image.id}/>)
        )}
      </div>
    </div>
  )
}

export default ImageArea