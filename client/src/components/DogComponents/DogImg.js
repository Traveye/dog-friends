import { useState, useEffect } from "react";

export default function DogImage(props) {
  const [picture, setPicture] = useState(
    "https://res.cloudinary.com/datl67gp3/image/upload/v1677887118/cld-sample.jpg"
  );

  useEffect(() => {
    if (props.picture !== undefined) {
      setPicture(props.picture);
    }
  }, [props.picture]);

  const style = {
    backgroundColor: 'rgb(223, 207, 62)',
    borderRadius: '90%',
    width: '250px',
    height: '250px',
    border: '5px solid rgb(223, 207, 62)',
  };

  return (
    <div style={style}>
      <img src={picture} alt="dog" style={style} />
    </div>
  );
}