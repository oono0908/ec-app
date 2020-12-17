import React from 'react';
import "../../assets/radio.css"

const Radio = (props) => {

    return (
      <label>
        <div className="radio">
          <div className={props.className.a}>
            <div className={props.className.b}>
              <input className="input" type="radio" onChange={props.onChange} value={props.value} name={props.name} defaultChecked={props.color === props.value}> 
              </input>
              {props.size && (props.value)}
            </div>
          </div>
        </div>
      </label>
    );
};

export default Radio