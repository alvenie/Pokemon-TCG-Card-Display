import {Charizard} from "../interfaces/Charizards.ts";
import {useState, useEffect} from "react";
import styled from "styled-components";
import CharizardsBuild from "./CharizardsBuild.tsx";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
`;

const InnerDiv=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    margin-top: 10px;
`;

const StyledInput = styled.input`
    font-size: 2.5vw;
    text-align: center;
`;

const StyledButton = styled.button`
    font-size: 2vw;
`;

export default function CharizardsData(){

    const [data, setData] = useState<Charizard[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("Charizard");
    const [input, setInput] = useState(name);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        async function fetchData(){
            setLoading(true);

            const rawData = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}%20supertype:Pok%C3%A9mon`);
            const results = await rawData.json();

            if (results.data.length === 0) {
                setError(`No Pokémon of the name ${name} is found`);
                setData([]);
            } else {
                setError(null);
                setData(results.data);
            }

            setLoading(false);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.error("There was an error: " + e));
    }, [name]);

    if (loading) return <div>Loading...</div>;

    return(
        <ParentDiv>
            <InnerDiv>
                <StyledInput
                    type="text"
                    placeholder="Enter a Pokémon"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <StyledButton onClick={()=>setName(input)}>Search Pokémon</StyledButton>
            </InnerDiv>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <CharizardsBuild data={data}/>
            )}
        </ParentDiv>
    );
}