import React, { useCallback, useEffect, useState } from 'react'
import { registerRoute } from 'workbox-routing'
import Card from './Card'
import Loading from './Loading'


const Cards = () => {

    const [images, setimages] = useState([])
    const [input, setinput] = useState("")
    const [loading, setloading] = useState(true)

    const peticion = useCallback(
        async() =>{
            const key = "client_id=ElXuxMcWR20OT3uXrjVNJuQs7GqGXMh0e0qD1Y720Ho"
            let route = `https://api.unsplash.com/photos/?${key}`
            if (input !== "") {
                route = `https://api.unsplash.com/search/photos/?query=${encodeURI(input)}&${key}`
            }
            
            const res = await fetch(route)
            const data = await res.json()
    
            if (data.results) {
                setimages(data.results)
            }
            else{
                setimages(data)
            }
        
            setloading(false)
        }
    , [input])


    useEffect(() => {
        peticion()
    }, [peticion])


    const handleSubmit = (e) =>{
        e.preventDefault()
        const text = (e.target[0].value)
        
        setinput(text)
    }

    return (
        <div className='text-center'>

        <form autoComplete='off' onSubmit={handleSubmit}>
            <label htmlFor="" className='w-75'>
                {" "}Buscar: 
                <input className='w-75' type="text" name="inputText"/>
            </label>
            <button type='submit' className='btn btn-warning m-2'>
                Search
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </form>

        <hr />

        {loading && <Loading/>}

        <div className='row'>
        {
            images.map((img)=>{
                return <div className='col' key={img.id}>
                    <Card img={img.urls.regular}></Card>
                </div>
            })
        }
        </div>
        </div>
    )
}

export default Cards
