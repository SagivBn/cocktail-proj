import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [cocktail, setCocktail] = useState(null)

    useEffect(() => {
        setLoading(true)

        async function fetchDetails() {
            try {
                const response = await fetch(`${url}${id}`)
                const data = await response.json()

                const drink = data.drinks
                if (drink) {
                    const {
                        strAlcoholic: info,
                        strCategory: category,
                        strGlass: glass,
                        strDrinkThumb: image,
                        strInstructions: instructions,
                        strDrink: name,
                        strIngredient1: ingredient1,
                        strIngredient2: ingredient2,
                        strIngredient3: ingredient3,
                        strIngredient4: ingredient4
                    } = drink[0]
                    const ingredients = [
                        ingredient1,
                        ingredient2,
                        ingredient3,
                        ingredient4
                    ]

                    const newCocktail = {
                        name,
                        image,
                        info,
                        category,
                        glass,
                        instructions,
                        ingredients
                    }
                    setCocktail(newCocktail)
                } else {
                    setCocktail(null)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        fetchDetails()
    }, [id])

    if (loading) {
        return <Loading />
    }

    return (
        <section className='section cocktail-section'>
            <Link to='/' className='btn btn-primary'>
                back home
            </Link>
            <h2 className='section-title'>{cocktail.name}</h2>
            <div className='drink'>
                <img src={cocktail.image} alt={cocktail.name}></img>
                <div className='drink-info'>
                    <p>
                        <span className='drink-data'>name :</span>{' '}
                        {cocktail.name}
                    </p>
                    <p>
                        <span className='drink-data'>category :</span>{' '}
                        {cocktail.category}
                    </p>
                    <p>
                        <span className='drink-data'>info :</span>{' '}
                        {cocktail.info}
                    </p>
                    <p>
                        <span className='drink-data'>glass :</span>{' '}
                        {cocktail.glass}
                    </p>
                    <p>
                        <span className='drink-data'>instructions :</span>{' '}
                        {cocktail.instructions}
                    </p>
                    <p>
                        <span className='drink-data'>ingredients :</span>{' '}
                        {cocktail.ingredients.map((ing, id) => {
                            return ing ? (
                                <span key={id}> {`${ing},`}</span>
                            ) : null
                        })}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SingleCocktail
