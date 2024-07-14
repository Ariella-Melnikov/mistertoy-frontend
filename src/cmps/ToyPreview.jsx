import { Link } from "react-router-dom";


export function ToyPreview({ toy, onToggleToy }) {
  return (
    <Link to={`/toy/${toy._id}`}>
    <article className='toy-preview'>
      <h2 className={toy.inStock ? 'in Stock' : 'Sold Out'} onClick={onToggleToy}>
        Toy name: {toy.name}
      </h2>
      <h4>price: {toy.price}</h4>
      {/* <img src={`../assets/img/${'toy'}.png`} alt="" /> */}
      <p className={toy.inStock ? 'green' : 'red'}>{toy.inStock ? 'In stock' : 'Not in stock'}</p>
    </article>
    </Link>
  )
}
