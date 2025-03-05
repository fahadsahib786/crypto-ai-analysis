
import React from 'react';
import './LoaderComponent.css'

const Loader = () => {
  return (
    <div style={{width:"150px",height:"150px",margin:"auto"}} >

    <div >
       <video width="150" height="150" autoPlay loop muted className="video-player">
        <source src={require("../utils/Video/loader.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  );
};

export default Loader;