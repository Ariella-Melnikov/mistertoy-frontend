import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js" 


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [newLabel, setNewLabel] = useState('')
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.get(params.toyId)
            .then(setToyToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function handleLabelChange(event) {
        setNewLabel(event.target.value)
    }

    function addLabel() {
        if (newLabel.trim()) {
            setToyToEdit(prevToyToEdit => ({ 
                ...prevToyToEdit, 
                labels: [...prevToyToEdit.labels, newLabel.trim()] 
            }))
            setNewLabel('')
        }
    }

    function removeLabel(index) {
        setToyToEdit(prevToyToEdit => {
            const newLabels = prevToyToEdit.labels.filter((_, i) => i !== index)
            return { ...prevToyToEdit, labels: newLabels }
        })
    }



    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('errddd:', err)
            })
    }

    const { name, price, labels, inStock } = toyToEdit
    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Toy name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Toy price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <label htmlFor="inStock">in Stock:</label>
                <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />

                <label htmlFor="newLabel">Add Label:</label>
                <input onChange={handleLabelChange} value={newLabel} type="text" id="newLabel" />
                <button type="button" onClick={addLabel}>Add Label</button>

                <ul>
                    {labels.map((label, index) => (
                        <li key={index}>
                            {label} <button type="button" onClick={() => removeLabel(index)}>Remove</button>
                        </li>
                    ))}
                </ul>

                <button>Save</button>
            </form>
        </section>
    )
}