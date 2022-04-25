import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Projects from './components/projects/Projects';
import {MdKeyboardArrowRight} from 'react-icons/md'

function App() {
  const [data, setData] = useState();
  const [all, setAll] = useState(3);

  
    useEffect (() => {
      axios.get(`http://api.salic.cultura.gov.br/v1/projetos/?limit=100&format=json`)
      .then((e) => {

        for (let i = 0; i < 100; i++){
          e.data._embedded.projetos[i].favorito = false;
          e.data._embedded.projetos[i].id = i;
        }

        setData(e.data._embedded.projetos); 

      })
      .catch((e) => {
          setData([])
      })
    }, [])

    function FuncAll(){
      if (all === 100){
        setAll(3);
      } else (setAll(100))
    }

    function MoreThree(){
      if (all < 100){ 
        setAll(all + 3)
      }  
    }


  return (
    <BodyApp>
      <h1>Ver todos projetos</h1>

      <Projects data={data} all={all}/>  

      <Circle id='circle' onClick={(()=>MoreThree())}>
        <MdKeyboardArrowRight id="arrow" onClick={(()=>MoreThree())}/>
      </Circle> 

      <div id="divbutton" >
        <ButtonAll id="all" onClick={(()=>FuncAll())}> {all === 100 ? 'VER MENOS' : 'VER TODOS'} </ButtonAll>
      </div>   

    </BodyApp>
  );
}

export default App;

const BodyApp = styled.div `
width: 90%;
margin: 100px auto;

  h1 {
    color: #1A838E;
    margin: 35px;
  }

  #divbutton {
    display: flex;
    justify-content: end;
    width: 100%;

    #more {
      text-align: center;
      height: 35px;
      width: 215px;
      font-size: 18px;
      margin-right: 10px;
      margin-top: 65px;
      cursor: pointer;
    }

    button:hover {
      background: #80808066;
    }

    #select {
      height: 35px;
      margin-top: auto;
    }
  } 
  
  #circle: hover {
    color: gray;
  }

`

const Circle = styled.div`
width: 40px;
position: absolute;
right: 40px;
height: 40px;
top: 475px;
border: solid #80808087;
border-radius: 80px;

  #arrow {
    position: relative;
    top: -6px;
    right: 3px;
    font-size: 50px;
    color: #80808087;
    cursor: pointer;
  }

  #arrow: hover {
    color: gray;
  }

`


const ButtonAll = styled.button`
text-align: center;
height: 35px;
width: 215px;
font-size: 18px;
margin-right: 10px;
margin-top: 65px;
cursor: pointer;
`

