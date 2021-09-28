import React, { useState, useEffect, useRef } from 'react';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AiFillInstagram,AiOutlineLeft,AiOutlineRight,AiFillMail,AiFillLinkedin,AiFillTwitterCircle,AiFillFacebook,AiOutlineClose} from "react-icons/ai";

function useKey(key,cb){
const callbackRef = useRef(cb)
useEffect(()=>{
  callbackRef.current = cb;
})
  useEffect(()=>{
    function handle(event){
      if(event.code===key ){
callbackRef.current(event)
      }
    }
    document.addEventListener("keydown",handle)
    return()=>document.removeEventListener("keydown",handle)
  },[key])
}

function App() {
  const [images, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [counts, setCounts] = useState(0);
  const [instagram, setInstagram] = useState([]);
  const [twitter, setTwitter] = useState([]);
  const [facebook, setFacebook] = useState([]);
  const [linkedin, setLinkedin] = useState([]);
  const [email, setEmail] = useState([]);
  const [total, setTotal] = useState(true);
  // const [disabledR, setDisabledR] = useState(false);
  // const [disabledL, setDisabledL] = useState(false);


 const handleImage =(b)=>{
  const imageUrls = images.map((i)=>i.image_2000px)
  const insta = images.map((i)=>i.insta)
  const fb = images.map((i)=>i.facebook)
  const twit = images.map((i)=>i.twitter)
  const mail = images.map((i)=>i.email)
  const ln = images.map((i)=>i.linkedin) 

setInstagram(insta);
setLinkedin(ln);
setFacebook(fb);
setTwitter(twit);
setEmail(mail);
  setImageUrl(imageUrls);
   setIsOpen(true)
   setModalShow(true)
setPhotoIndex(b);
 }

  useEffect(() => {
    fetchImages(counts);
    document.getElementById('#leftIcon')
  }, [])

  useKey('ArrowLeft',handleLeft);
  useKey('ArrowRight',handleRight);
  useKey('Escape',handleClose);

  function handleClose (){
    setIsOpen(false)
  }

  function handleLeft(){
    setPhotoIndex((photoIndex + imageUrl.length - 1) % imageUrl.length);
 
  }
  function handleRight (){
    setPhotoIndex( (photoIndex + 1) % imageUrl.length);
  }

  const fetchImages = (count=10) => {
   setCounts( counts + 10);
   apiCall(counts);
  }

  const apiCall =(a)=>{
    console.log(a)
    const api = "https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-cmkjd/service/oneeyeland/incoming_webhook/gallary";
    const params = {"start":a,"length":10};

    
    axios.post(api, params)
      .then(res => {
        setImage([...images, ...res.data.images]);
        if(counts<res.data.total_count)
        {
         setTotal(true)
        }
        else{
          setTotal(false)

        }
      })
  }
  
  return (
    <div>
      <Heading />
      <div className={isOpen ? "model open" : "model"}>
      {/* <input onKeyDown={ handleKeyDown }/> */}
        <>
       <img src={imageUrl[photoIndex]}/>
         <AiOutlineClose onClick={()=>setIsOpen(false)} className="closesvg"/>
         <div>
         <AiOutlineLeft onClick={handleLeft} id="leftIcon"  className="leftsvg"/>
         </div>
         <AiOutlineRight onClick={handleRight} className="rightsvg"/>
         </>
       {/* <div className="mt-2 iconDiv">
          <a href={instagram[photoIndex]} target = "_blank" > <AiFillInstagram className='insta'/></a>
          <a href={email[photoIndex]} target = "_blank" > <AiFillMail href={email[photoIndex]} target = "_blank" className='insta'/> </a>
          <a href={linkedin[photoIndex]} target = "_blank" > <AiFillLinkedin href={linkedin[photoIndex]} target = "_blank" className='insta'/></a>
          <a href={twitter[photoIndex]} target = "_blank" > <AiFillTwitterCircle className='insta'/></a>
          <a href={facebook[photoIndex]} target = "_blank" > <AiFillFacebook  className='insta'/> </a>
          </div> */}
      </div>

      {/* Gallery view */}
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={total?<Loader />:''}
      >
        <div className='wrapperImage'>
          
          {images.map((image,index) => (
            <img className="imgcls" src={image.image_200px} key={index} 
            onClick={()=>{handleImage(index)}}
             />
          ))}
        </div>
        </InfiniteScroll>
    </div>
  );
}

export default App;
