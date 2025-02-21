import styled from "styled-components";
import {Charizard} from "../interfaces/Charizards.ts";

const AllCharsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: navajowhite;
`;

const SingleCharDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 20%;
    padding: 1%;
    margin: 1%;
    border: 3px indianred solid;
    font: italic bold calc(2px + .75vw) "Times New Roman", fantasy;
    text-align: center;
`;

export default function CharizardsBuild(props : { data:Charizard[]}){

    return(
        <AllCharsDiv>
            {
                props.data.map((char: Charizard) =>
                    <SingleCharDiv key={char.id}>
                        <img src={char.images.large} alt={`Image of ${char.name}`}/>
                        <h1>{char.name}</h1>
                        <h3>Set: {char.set.name}</h3>
                    </SingleCharDiv>
                )
            }
        </AllCharsDiv>
    )

}