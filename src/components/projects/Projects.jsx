import { useState } from 'react';

import styled from 'styled-components';

import {AiOutlineHeart} from 'react-icons/ai';
import { Three } from './Projects.action';

function Projects (props){
    let data = props.data;


    return (
        <BodyProjects>
            <SectionProjects >
                {props.data ?                
               Three(props.data, props.all).map((e, index)=>(
                        <DivSect key={index}>
                            <h2 id='title'>ROUANET</h2>
                            <h2 id='name'> {e.nome} </h2>
                            <p id='city'> {e.municipio}, {e.UF}</p>
                            <p id='resum'> {e.resumo} </p>
                            <p id='okay'>APROVADO: <strong>{e.valor_aprovado}</strong></p>
                            <p id='captade'>CAPTADO: <strong>{e.valor_captado}</strong></p>
                            <div>
                                <ButtonStorage favorito={e.favorito} > ADICIONAR </ButtonStorage>
                                <AiOutlineHeart id='icon' favorito={e.favorito} />
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
grid-gap: 20px;


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
width: 33%;
margin: 15px;
min-width: 350px;
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
        font-size: 25px;
    }


    @media (max-width: 1000px){
        width: 90%;
    }
    
`

const ButtonStorage = styled.button`
background: ${props => props.favorito === true ? 'red' : 'white'}
font-size: 19px;
border: white;
width: 260px;
padding: 15px;
cursor: pointer;
`