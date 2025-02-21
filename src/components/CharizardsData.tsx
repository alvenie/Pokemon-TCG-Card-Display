import {Charizard} from "../interfaces/Charizards.ts";
import {useState, useEffect} from "react";
import styled from "styled-components";
import CharizardsBuild from "./CharizardsBuild.tsx";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
`;

export default function CharizardsData(){

    const [data, setData] = useState<Charizard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function fetchData(){
            const rawData = await fetch("https://api.pokemontcg.io/v2/cards?q=name:charizard%20supertype:Pok%C3%A9mon");
            const results = await rawData.json();
            setData(results.data);
            setLoading(false);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.error("There was an error: " + e));
    }, []);

    if (loading) return <div>Loading...</div>;

    return(
        <ParentDiv>
            <CharizardsBuild data={data}/>
        </ParentDiv>
    );
}