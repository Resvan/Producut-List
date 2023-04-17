import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddProduct from '../../Components/Navbar/AddProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProduct } from '../../Redux/userReducer';

const Home = () => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch();
    const getProducts =async () => {
        const { data } = await axios.get("http://localhost:6000/product")
        dispatch(setProduct({products: data}))
    }
    useEffect(() => {
        getProducts()
    },[])
    return (
        <>
            {
                products.map((prod, i) =>
                    <Card key={i} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                )
            }
            
            <AddProduct/>
      </>
      
  )
}

export default Home
