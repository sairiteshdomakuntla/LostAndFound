import { useState ,useEffect} from "react";
import { api } from "../config";
import noImage from "../assets/no-image.png"
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Itemcard(props) {
  const [image, setImage] = useState(noImage);
  useEffect(() => {
    axios
      .get(`${api}/files/${props.image}`)
      .then((res) => {
        setImage(`${api}/files/${props.image}`);
      })
      .catch((error) => {
        setImage(noImage);
      });


  },[props.image]);


  return (
    <Link to={`/find/details/${props.id}`} data-aos="fade-up">
      <div className="card">
        <div className="card-img">
          <img
            src={image}
            alt=""
          />
        </div>
        <div className="card-desc">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </Link>
  );
}
