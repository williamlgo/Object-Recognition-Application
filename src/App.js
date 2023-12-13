// Import dependencies
import React, { useRef, useState, useEffect } from "react";
// Import Audio files
import sound1 from "./assets/Person.mp3";
import sound2 from "./assets/bag.mp3";
import sound3 from "./assets/cell_phone.mp3";
import sound4 from "./assets/cup.mp3";
import sound5 from "./assets/fork.mp3";
import sound6 from "./assets/glasses.mp3";
import sound7 from "./assets/key.mp3";
import sound8 from "./assets/knife.mp3";
import sound9 from "./assets/remote.mp3";
import sound10 from "./assets/scissors.mp3";
import sound11 from "./assets/spoon.mp3";
import sound12 from "./assets/wallet.mp3";
import sound13 from "./assets/watch.mp3";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Object Recognition model loaded.");
    //  Loop and detect objects
    setInterval(() => {
      detect(net);
    }, 6000);
  };

  //Play Sound function
  async function playSound(obj){
    if(obj === "person"){ //working
      new Audio(sound1).play();
    } else if (obj === "backpack"){ //working
      new Audio(sound2).play();
    }else if (obj === "handbag"){ //working
      new Audio(sound2).play();
    } else if (obj === "cell phone"){ //working
      new Audio(sound3).play();
    } else if (obj === "cup"){ //working
      new Audio(sound4).play();
    } else if (obj === "fork"){ //working
      new Audio(sound5).play();
    } else if (obj === "glasses"){
      new Audio(sound6).play();
    } else if (obj === "key"){
      new Audio(sound7).play();
    } else if (obj === "knife"){ //working
      new Audio(sound8).play();
    } else if (obj === "remote"){ //working
      new Audio(sound9).play();
    } else if (obj === "scissors"){ //working
      new Audio(sound10).play();
    } else if (obj === "spoon"){ //working
      new Audio(sound11).play();
    } else if (obj === "wallet"){
      new Audio(sound12).play();
    } else if (obj === "watch"){
      new Audio(sound13).play();
    }    
  };

  //THIS IS THE MAIN PART OF THE CODE !!!!!! LOOK AT THIS !! 
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      console.log(obj);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 

      // Getting the detection info
      // Depending on which object is detected, play the correct sound.
      obj.forEach(prediction => {
        sleep(2500).then(() => {
        const detectedObj = prediction['class'];
        //mostRecent = prediction['class'];
        if (detectedObj === "person"){
          //playSound(detectedObj);
        } else if (detectedObj === "cell phone") {
          playSound(detectedObj)
        } else if (detectedObj === "wallet") {
          playSound(detectedObj)
        } else if (detectedObj === "remote") {
          playSound(detectedObj)
        } else if (detectedObj === "key") {
          playSound(detectedObj)
        } else if (detectedObj === "fork") {
          playSound(detectedObj)
        } else if (detectedObj === "spoon") {
          playSound(detectedObj)
        } else if (detectedObj === "knife") {
          playSound(detectedObj)
        } else if (detectedObj === "handbag") {
          playSound(detectedObj)
        } else if (detectedObj === "backpack") {
          playSound(detectedObj)
        } else if (detectedObj === "scissors") {
          playSound(detectedObj)
        } else if (detectedObj === "cup") {
          playSound(detectedObj)
        } else if (detectedObj === "glasses") {
          playSound(detectedObj)
        } else if (detectedObj === "watch") {
          playSound(detectedObj)
        } 
      });
      });
    }
  };

  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
