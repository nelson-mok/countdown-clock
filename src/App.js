import React from 'react';
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [sessionTime,setSessionTime]=useState(25);
  const [breakTime,setBreakTime]=useState(5);
  const [timeSpeed,setTimeSpeed]=useState(1000);
  const [time,setTime] = useState(timeDisplay({minutes: sessionTime, seconds: 0}));
  const [start,setStart] = useState(false);
  const [session,setSession] = useState(true);
  let interval = null;

  useEffect(()=>{
    if (start){
      interval = setInterval(()=>{
        setTime({minutes: time.minutes,seconds:time.seconds-1})},timeSpeed);
    } else if (!start){
      clearInterval(interval);
    }

    if (time.minutes == -1){
      if (session){
        setTime({minutes: breakTime,seconds: 0});
      } else {
        setTime({minutes: sessionTime,seconds: 0});
      }
      setSession(!session)
      const sound = document.getElementById('beep');
      sound.currentTime = 0;
      sound.play();
    }
    return ()=>clearInterval(interval);
  })
  
  useEffect(()=>{
    if (!start && session){
      setTime({minutes: sessionTime, seconds: 0})
    }
  },[sessionTime])

  useEffect(()=>{
    if (!start && !session){
      setTime({minutes: breakTime, seconds: 0})
    }
  },[breakTime])


  function timeDisplay(time){
    if (time.seconds<0){
      time.minutes --
      time.seconds = "59"
    }
    if (time.minutes>=0 && time.minutes<10){
      time.minutes = "0"+parseInt(time.minutes)
    }
    if (time.seconds<10){
      time.seconds = "0"+parseInt(time.seconds)
    }
    console.log('result')
    console.log(time)
    return time.minutes+":"+ time.seconds
  }
  
  function reset(){
    clearInterval(interval);
    setStart(false);
    setSession(true);
    setSessionTime(25);
    setBreakTime(5);
    setTime({minutes: sessionTime, seconds: 0})
  }

  return (
    <div id="App">
      <br></br>
      <br></br>
      <h1 id="session-label">Session Length</h1>
      <h2 id="session-length">{sessionTime}</h2> 
      <Button id="session-decrement"variant="primary" onClick={()=>sessionTime>1 && !start?setSessionTime(sessionTime-1):sessionTime}>session -</Button>
      <Button id="session-increment" variant="primary"onClick={()=>sessionTime<60 && !start?setSessionTime(sessionTime+1):sessionTime}>session +</Button>
      <br></br>
      <h1 id="break-label">Break Length</h1>
      <h2 id="break-length">{breakTime}</h2> 
      <Button id="break-decrement" variant="primary"onClick={()=>breakTime>1 && !start?setBreakTime(breakTime-1):breakTime}>break -</Button>
      <Button id="break-increment" variant="primary"onClick={()=>breakTime<60 && !start?setBreakTime(breakTime+1):breakTime}>break +</Button>
      <br></br>
      <h1 id="timeSpeed-label">Time Speed</h1>
      <h2 id="timeSpeed-length">{timeSpeed}</h2> 
      <Button id="timeSpeed-decrement" variant="primary"onClick={()=>timeSpeed>100 && !start?setTimeSpeed(timeSpeed-100):timeSpeed}>speed -</Button>
      <Button id="timeSpeed-increment" variant="primary"onClick={()=>timeSpeed<2000 && !start?setTimeSpeed(timeSpeed+100):timeSpeed}>speed +</Button>
      <br></br>
      <br></br>
      <br></br>
      <h1 id="timer-label">{session?"Session":"Break"}</h1>
      <h1 id="time-left">{timeDisplay(time)}</h1>
      <Button id="start_stop" variant="success" onClick={()=>setStart(!start)}>Start/Stop</Button>
      <Button id="reset" variant="danger" onClick={reset}>Reset</Button>
      <audio id="beep" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>
    </div>
  );
}

export default App;
