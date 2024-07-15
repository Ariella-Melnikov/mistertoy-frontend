import { Link } from "react-router-dom"

import { ToyPreview } from "./ToyPreview.jsx"
import { CardToyPreview } from "./CardToyPreview.jsx"

export function ToyList({ toys, user, onRemoveToy }) {

    if (!toys.length) return <p>No toys to show...</p>

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <CardToyPreview toy={toy} user={user}  onRemoveToy={onRemoveToy} />
                    <section>
                        {/* <button onClick={() => onRemoveToy(toy._id)}>Remove</button> */}
                        {/* <button><Link to={`/toy/${toy._id}`}>Details</Link></button> */}
                        {/* <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}