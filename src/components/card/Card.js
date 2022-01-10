import React from 'react'
import './card.css'
import typeColors from '../../services/pokemonTypes'


// recebemos os dados dos pokemons, e aqui acessamos eles seguindo a forma do json da API
function Card({pokemon}) {
    return (
        <div className='Card'>
            <div className='Card__img'>
                <img src={pokemon.sprites.front_default} alt=''></img>
            </div>
            <div className='Card__name'>
                {pokemon.name}
            </div>
            <div className='Card__types'>
                {
                    pokemon.types.map(type => {
                        return(
                            <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name]}}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className='Card__info'>
                <p className='title'>Habilidades:</p>
                {
                    pokemon.abilities.map(ability => { //como abilities é um vetor fazemos um map para acessar todos os conteudo de abilites e retornamos uma tag P contendo o nome
                        return(
                            <p>
                                {ability.ability.name}
                                </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card;