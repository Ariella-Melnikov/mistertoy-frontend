/* eslint-disable react/prop-types */
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export function CardToyPreview({ toy, user, onRemoveToy }) {
  const { name, inStock, price, imgUrl, _id } = toy
  return (
    <Card sx={{ maxWidth: 220 }}>
      <div className="toy-preview">
        <CardMedia component="img" src={imgUrl} height="250" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {inStock ? 'In stock' : 'Not in stock'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price + '$'}
          </Typography>
        </CardContent>

        <CardActions>
          <div className="editing-toy">
            <div className="editing-toy-btn">
              {user && user.isAdmin && (
                <>
                  <Link to={`/toy/edit/${_id}`}>
                    <button size="small">Edit</button>
                  </Link>
                  <button size="small" onClick={() => onRemoveToy(_id)}>
                    Delete
                  </button>
                </>
              )}
              <Link to={`/toy/${_id}`}>
                <button className='learn-btn' size="small">Learn More</button>
              </Link>
            </div>
          </div>
        </CardActions>
      </div>
    </Card>
  )
}
