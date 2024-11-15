import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';

 // interface d'une carte
interface CarteProps {
  image: string;
  estRetourne: boolean;
  onClick: () => void;
}

// affichage d'une carte cliquable
const Carte: React.FC<CarteProps> = ({ image, estRetourne, onClick }) => {
  return (
    <Card sx={{ width: 100, height: 100, margin: 1 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          //si la carte est retournée, on affiche l'image sinon on affiche le svg
          image={estRetourne ? `/${image}` : 'dessus-carte.png'}
          sx={{ width: '100%', height: '100%' }}
        />
      </CardActionArea>
    </Card>
  );
};

export default Carte;
