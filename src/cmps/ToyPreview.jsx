export function ToyPreview({ toy, onToggleToy }) {
    return (
        <article className="toy-preview">
            <h2 className={(toy.inStock)? 'in Stock' : 'Sold Out'} onClick={onToggleToy}>
                Toy name: {toy.name}
            </h2>
            <h4>price: {toy.price}</h4>
            {/* <img src={`../assets/img/${'toy'}.png`} alt="" /> */}
            <ul className="toy-labels">
                {toy.labels.map((label, index) => (
                    <li key={index}>{label}</li>
                ))}
            </ul>
        </article>
    )
}
