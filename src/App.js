import './App.css';
import { Header, Card} from './components'
import React, {useState, useEffect} from 'react';
import { getAllPokemons} from './services/pokemon';

function App() {
  //variaveis.
  const [pokemonData, setPokemonsData] = useState([]);//guarda todos os dados de cada pokemon.
  const [nextUrl, setNextUrl] = useState(''); //guarda a url da proxima página.
  const [prevUrl, setPrevUrl] = useState(''); // guarda a url da pagina anterior.
  const [loading, setLoading] = useState(true); // guarda o estado dos dados, carregando ou não.
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon' // url inicial que contem todos os dados.


  useEffect(()=> {
    //procurando os dados
    async function fetchData() {
      let response = await getAllPokemons(initialUrl); //guardando o resultado da api em response.
      setNextUrl(response.next);//guardando a url ta proxima pagina .
      setPrevUrl(response.previous); //guardando a url da pagina anterior, (no primeiro ele vem como null).
      let pokemon = await loadingPokemon(response.results); //chama a função que carrega todas as informações dos pokemons.
      setLoading(false); // coloca a loading para falso pois os dados já vieram. será executa depois que a "loadingPokemon" executar.
    }
    fetchData(); // chama a função que busca os dados.

  }, [])
  
  //função que carrega os pokemons para proxima página.
  const next = async () => {
    setLoading(true); //Coloca o estatus para carregando.
    let data = await getAllPokemons(nextUrl) // guarda os nomes dos pokemons em data
    await loadingPokemon(data.results) //chama a função que carrega todas as informações dos pokemons com base nos nomes guardado em data
    setNextUrl(data.next); //seta a proxima url.
    setPrevUrl(data.previous);// seta a url anterior.
    setLoading(false);//seta o estatus para false pois já veio os dados.
  }

  // função que carrega os pokemons para página anterior.
  const prev = async () => {
    if(!prevUrl){ // verifica se a página anterior existe, (na primeira página e null)
      return;
    }
    setLoading(true);//coloca o estatus para carregando.
    let data = await getAllPokemons(prevUrl) // guarda os nomes dos pokemons em data
    await loadingPokemon(data.results) // chama a função que carrega todas as informações dos pokemons com base nos nomes guardado em data
    setNextUrl(data.next);//seta a proxima url
    setPrevUrl(data.previous);//seta a url anterior
    setLoading(false);//seta o estatus para false pois já veio os dados.
  }

// função que armazena todas as informações de cada pokemon na variavel pokemonData
  const loadingPokemon = async (data) => {// vem os dados com os nomes dos pokemons e sua url contendo as informações pessois de cada pokemon.
    let _pokemonData = await Promise.all(data.map(async pokemon => { // espera todas as promisses chegarem
      let pokemonRecord = await getAllPokemons(pokemon.url); // guarda na varivel todas as informações pessoais de todos os pokemons
      return pokemonRecord;//devolve essas informações
    }))

    setPokemonsData(_pokemonData) // guarda todas essas informações na variavel pokemonData
  }
  return (
    <div className='container'>
      <Header/>
      {loading ? <h1 >Carregando...</h1> : (
        <>
          <div className="grid-container">
              {pokemonData.map((pokemon, i) => { 
                return <Card key={i} pokemon={pokemon} />//passando por parametro os dados de todos os pokemons para o componente "Card"
              })}
            </div>
        </>
      ) }
      <div className='btn'>
         <button onClick={prev}>Anterior</button>
         <button onClick={next}>Proximo</button>
      </div>
    </div>
  );
}


export default App;
