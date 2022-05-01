import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types'; 
import { createGlobalStyle } from 'styled-components'
import './styles.css'

import { Time } from './styles';

const Countdown = ({backgroundColor, time}) => {
    //console.log("---------")
  //console.log(backgroundColor)

  const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${backgroundColor ? backgroundColor: "#2f363e"};
  }
`

  const [hora, setHora] = useState(0)
  const [minuto, setMinuto] = useState(1)
  const [segundo, setSegundo] = useState(30)
  //const [pausa, setPausa] = useState(false)
  const [timerOn, setTimerOn] = useState(false)
  //JS style
          
  let hours = useRef();
  let minutes = useRef();
  let seconds = useRef();
  let hh = useRef();
  let mm = useRef();
  let ss = useRef();
  let hr_dot = useRef();
  let min_dot = useRef();
  let sec_dot = useRef(); 
  let interval = null;
 
  useEffect(() => {
    

    if(timerOn)
    {
      interval = setInterval(()=>{
        setSegundo(anteriorSeg => anteriorSeg-1)
        if(minuto>0){
          if(segundo == 0)
        {
          setMinuto(anteriorMin => anteriorMin-1)
          setSegundo(59)
        }}
        
        if(hora>0)
        {if(minuto == 0)
        {
          setHora(anteriorHora => anteriorHora-1)
          setMinuto(59)
        }}
        if(hora==0 && minuto==0 && segundo==0)
        {
          setSegundo(0)
          clearInterval(interval)
          setTimerOn(false)
        }
        //clearInterval(interval)
      }, 1000)
    }
    else{
      clearInterval(interval)
    }
    
    ////////////////  
    console.log(hours.current)
    hh.current.style.strokeDashoffset = 440 - (440 * hora) / 24; /*para que el borde de color se vaya llenando*/
    mm.current.style.strokeDashoffset = 440 - (440 * minuto) / 60;
    ss.current.style.strokeDashoffset = 440 - (440 * segundo) / 60;
    
    hr_dot.current.style.transform = `rotateZ(${hora * 15}deg)`;
    min_dot.current.style.transform = `rotateZ(${minuto * 6}deg)`;
    sec_dot.current.style.transform = `rotateZ(${segundo * 6}deg)`;

    
    // 360 / 60sec = 6
  ///////////////

    return () => {
      clearInterval(interval)
    }
  })
  

  const continuarBoton = () =>{
    //Lo de la linea 58 - 60 era para agregar un tiempo pasado al sector inferior en el apartado de time, pero no salió.
    let tiempoCompactoString = "" + (hora < 10 ? "0"+hora : hora) + (minuto < 10 ? "0"+minuto : minuto) + (segundo < 10 ? "0"+segundo : segundo)
    console.log(Number(tiempoCompactoString))
    time.push(Number(tiempoCompactoString))
    setTimerOn(true)
    
  }

  //return <Time>00:00:00</Time>;
  return(
    <React.Fragment>
      <GlobalStyle></GlobalStyle>
      <div id="time">
          <div className='circle' id='hoursC'>
            <div className='dots hour_dot' ref={hr_dot}></div>
            <svg>
            {/* Necesitamos 2 circuluos tener un borde de color y otro negro */}
              <circle cx={"70"} cy={"70"} r={"70"}></circle> 
              <circle cx={"70"} cy={"70"} r={"70"} id="hh" ref={hh}></circle>
            </svg>

            <div ref={hours} id='hours'>
              {hora < 10 ? "0"+hora : hora}<br />
              <span>Hours</span>
            </div>
            
          </div>

          <div className='circle' id='minutesC'>
            <div className='dots minute_dot' ref={min_dot}></div>
            <svg>
              <circle cx={"70"} cy={"70"} r={"70"}></circle>
              <circle cx={"70"} cy={"70"} r={"70"} id="mm" ref={mm}></circle>
            </svg>

            <div ref={minutes} id='minutes'>
              {minuto < 10 ? "0"+minuto : minuto}<br />
              <span>Minutes</span>
            </div>
          </div>

          <div className='circle' id='secondsC'>
            <div className='dots second_dot'ref={sec_dot}></div>
            <svg>
              <circle cx={"70"} cy={"70"} r={"70"}></circle>
              <circle cx={"70"} cy={"70"} r={"70"} id="ss" ref={ss}></circle>
            </svg>

            <div ref={seconds} id='seconds'>
              {segundo < 10 ? "0"+segundo : segundo}<br />
              <span>Seconds</span>
            </div>  
          </div>
      </div>
      <div className='buttons'>
        {!timerOn && (hora == 0 && minuto == 0 && segundo == 0) && (<button onClick={() => {setTimerOn(true);setHora(0);setMinuto(1);setSegundo(30)}}>Encender</button>)}
        {timerOn && (<button onClick={() => {setTimerOn(false)}}>Pausa</button>)}
        {!timerOn && (segundo > 0 || minuto > 0) && (<button onClick={continuarBoton}>Continuar</button>)}
        {!timerOn && (segundo > 0 || minuto > 0) && (<button onClick={() => {setHora(0);setMinuto(1);setSegundo(30)}}>Resetear</button>)} 
      </div>
    </React.Fragment>
  )
};

Countdown.propTypes = {
  time: PropTypes.arrayOf(PropTypes.number),
};
Countdown.defaultProps = {
  time: [],
};

export default Countdown;
