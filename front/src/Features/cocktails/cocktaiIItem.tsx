import * as React from 'react';
import Card from '@mui/material/Card';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Cocktail, User } from '../../types';
import { apiURL } from '../../constants';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Button, Grid } from '@mui/material';
import { selectCocktailPublishedLoading } from './cocktailsSlice';
import { getCocktails, togglePublishedItem } from './cocktailsThunks';

interface ExpandMoreProps extends IconButtonProps {
  cocktailItem: Cocktail;
}

const CocktailItem: React.FC<ExpandMoreProps> = ({cocktailItem}) => {
  const user: User | null = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const publishedOnLoading: boolean = useAppSelector(selectCocktailPublishedLoading);

  const handleTogglePublished = async () => {
    await dispatch(togglePublishedItem({id: cocktailItem._id, token: user?.token || ''}))
    await dispatch(getCocktails(user));
  }

  return (
    <Card 
    sx={{ width: 305}} >
      <Grid sx={{ textDecoration: 'none' }} component={NavLink} to={'/' + cocktailItem._id}>
        <CardMedia
        component="img"
        height="294"
        image={apiURL + '/' + cocktailItem.image}
        alt="Paella dish"
        />
        <CardContent>
        <Typography variant="h5" color="text.warning">
          {cocktailItem.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cocktailItem.recipe}
        </Typography>
      </CardContent>
      </Grid>
      {user?.role === 'admin' && 
      <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
        <Button>
          <DeleteOutlineIcon color='warning'/>
        </Button>
        {cocktailItem.isPublished ? 
        <Button color='info' disabled={publishedOnLoading} onClick={handleTogglePublished}>
          Hide
        </Button> : 
        <Button color='success' disabled={publishedOnLoading} onClick={handleTogglePublished}>
          Publicate
        </Button>}
      </CardActions>}
    </Card>
  );
}

export default CocktailItem;