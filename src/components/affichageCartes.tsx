import React from 'react';
import Carte from './carte';
import ImageList from '@mui/material/ImageList';

// interface grille de carte
interface AffichageCarteProps {
  cartes: { id: number; image: string; estRetourne: boolean; estPareil: boolean }[];
  onCarteClick: (id: number) => void;
}

// affiche les cartes en 4 colonnes et cliquable
const AffichageCarte: React.FC<AffichageCarteProps> = ({ cartes, onCarteClick }) => {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164} >
      {cartes.map((carte) => (
        <Carte
          key={carte.id}
          image={carte.image}
          estRetourne={carte.estRetourne || carte.estPareil}
          //recupere l'id de la carte cliqué
          onClick={() => onCarteClick(carte.id)}
        />
      ))}
    </ImageList>
  );
};

export default AffichageCarte;