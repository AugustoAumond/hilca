import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Projects from './components/projects/Projects';
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md'

function App() {
  const [data, setData] = useState();
  const [all, setAll] = useState(3);
  
    // Consumir a Api e guardar os dados no data;
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

    // Mostrar todos projetos na tela;
    function FuncAll(){
      if (all === 100){
        setAll(3);
      } else (setAll(100))
    }

    // Mostrar os próximos três projetos e abrir botão de voltar três projetos;
    function MoreThree(){
      if (all < 100){ 
        setAll(all + 3)
      } 
      
      if (all > 3){
        document.querySelector('#circleleft').style.display = 'block';
      }
    }

    // Mostrar os três projetos anteriores e fechar botão de voltar;
    function LessThree(){
      if (all > 3){
        setAll(all -3);
      }

      if (all === 3){
        document.querySelector('#circleleft').style.display = 'none';
      }
    }


  return (
    <BodyApp>
      <h1>Ver todos projetos</h1>

      <Projects data={data} all={all}/>  

      <CircleLeft id='circleleft' onClick={(()=>LessThree())}>
        <MdKeyboardArrowLeft id="arrow" onClick={(()=>LessThree())}/>
      </CircleLeft> 

      <CircleRight id='circleright' onClick={(()=>MoreThree())}>
        <MdKeyboardArrowRight id="arrow" onClick={(()=>MoreThree())}/>
      </CircleRight> 

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
  
  #circleright: hover {
    color: gray;
  }

`

const CircleRight = styled.div`
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

const CircleLeft = styled.div`
display: none;
width: 40px;
position: absolute;
left: 40px;
height: 40px;
top: 475px;
border: solid #80808087;
border-radius: 80px;

  #arrow {
    position: relative;
    top: -6px;
    right: 7px;
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

