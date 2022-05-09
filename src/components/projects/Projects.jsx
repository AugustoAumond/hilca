import{useEffect, useState} from 'react';

import styled from 'styled-components';

import {AiOutlineHeart} from 'react-icons/ai';
import { Three } from './Projects.action';

function Projects (props){
    // Atualizar tela
    const [change, setChange] = useState();

    let data = props.data;

    //Atualizar tela
    useEffect (()=>{

    }, [change])

    // Adicionar favoritos ao localStorage e mudar variável que atualiza o botão e a tela;
    function AddFavorits (value, index){
        let favorits = JSON.parse(localStorage.getItem('favorits'));
        if (favorits === null){
            favorits = value;
            favorits.favorito = true;
            data[value.id].favorito = true;
            localStorage.setItem('favorits', JSON.stringify([favorits])); 
        } else {
            if (value.favorito === true){ 
                for (let i = 0; i < favorits.length; i++){
                    if (value.nome.indexOf(favorits[i].nome) > -1){
                        favorits.splice(i, 1);
                        data[value.id].favorito = false;
                        localStorage.setItem('favorits', JSON.stringify(favorits));  
                    }
                }               
            } else {
                value.favorito = true;
                favorits.push(value);
                data[value.id].favorito = true;
                localStorage.setItem('favorits', JSON.stringify(favorits));   
            }
        }
        setChange(favorits.length);
    }

    return (
        <BodyProjects>
            <SectionProjects >
                {props.data ?                
                Three(data, props.all).map((e, index)=>(
                    <DivSect key={index}>
                        <h2 id='title'>ROUANET</h2>
                        <h2 id='name'> {e.nome ?? e.nome} </h2>
                        <p id='city'> {e.municipio??e.municipio}, {e.UF??e.UF}</p>
                        <p id='resum'> {e.resumo??e.resumo} </p> 
                        <p id='okay'>APROVADO: <strong>{e.valor_aprovado??e.valor_aprovado}</strong></p>
                        <p id='captade'>CAPTADO: <strong>{e.valor_captado??e.valor_captado}</strong></p>                           
                        <div>
                            <ButtonStorage  favorito={data[e.id].favorito} onClick={(()=>AddFavorits(e, index))}> ADICIONAR  
                                <AiOutlineHeart id='icon' favorito={data[e.id].favorito} />   
                            </ButtonStorage>
                             
                        </div>
                    </DivSect>                       
                )) : <div> Carregando ... </div>}
            </SectionProjects>
        </BodyProjects>
    )
}
export default Projects;

const BodyProjects = styled.div`
`

const SectionProjects = styled.section`
display: grid;
grid-template-columns: repeat(3, 1fr);
max-width: 1200px;
margin: 0 auto;


    @media (max-width: 1250px){
        grid-template-columns: repeat(2, 1fr);
        margin: 0 auto;  
    }

    @media (max-width: 840px){
        grid-template-columns: repeat(1, 1fr);
        margin: 0 auto;  
    }
`

const DivSect = styled.div `
position: relative;
left: 15px;
width: 30%;
margin: 15px;
min-width: 300px;
flex-wrap: wrap;
margin-top: 70px;


    #title {
    color: #C69949
    }

    #name {
        text-align: justify;
        width: 100%;
    }

    #resum {
        text-align: justify;
        width: 100%;
    }

    div {
        display: flex;
        align-items: center;
    }

    button: hover {
        background: #80808066;
    }

    #icon {
        top: 0px;
        font-size: 25px;
        position: relative;
        right: -85px;
        color: ${props => props.favorito === true ? 'black' : '#80808080'};
    }


    @media (max-width: 1000px){
        width: 90%;
    }
    
`

const ButtonStorage = styled.button`
background: ${props => props.favorito === true ? 'red' : 'white'};
font-size: 22px;
border: white;
width: 100%;
padding: 15px;
color: ${props => props.favorito === true ? 'black' : '#80808080'};
cursor: pointer;
`