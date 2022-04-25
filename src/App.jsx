import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Projects from './components/projects/Projects';
import {MdKeyboardArrowRight} from 'react-icons/md'

function App() {
  const [data, setData] = useState();
  const [all, setAll] = useState(3);

  
    useEffect ( () => {
      axios.get(`http://api.salic.cultura.gov.br/v1/projetos/?limit=100&format=json`)
      .then((e) => {

        for (let i = 0; i < all; i++){
          e.data._embedded.projetos[i].favorito = false;
        }

        setData(e.data._embedded.projetos); 

      })
      .catch((e) => {
          setData([])
      })
    }, [data, all])

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

      <Circle onClick={(()=>MoreThree())}>
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

  #arrow{
    position: absolute;
    right: 5px;
    top: 524px;
    font-size: 25px;
    color: #000000d4;
    cursor: pointer;
  }

  #arrow: hover {
    color: #C69949;
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
`

const Circle = styled.div`
width: 30px;
position: absolute;
right: 80px;
height: 30px;
top: 475px;
border: solid #80808087;
border-radius: 80px;


  #arrow {
    position: relative;
    top: -11px;
    right: 10px;
    font-size: 50px;
    color: #80808087;
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

