// import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                Navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <h5>Toy labels: {toy.labels.join(', ')}</h5>
            <h5>Status: {toy.inStock ? 'In Stock' : 'Out of Stock'}</h5>

            {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; */}
            {/* <Link to={`/toy`}>Back</Link> */}
            {/* <p>
                <Link to="/toy/nJ5L4">Next toy</Link>
            </p> */}
        </section>
    )
}