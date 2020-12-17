import React from 'react';

const ImagePreview = (props) => {

    return (
        <div className="imageInner" onClick={() => props.delete(props.id)}>
            <img alt="アイキャッチ画像" src={props.path} className="imageSize"/>
        </div>
    );
};

export default ImagePreview;