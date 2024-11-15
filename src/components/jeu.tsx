import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import AffichageCarte from './affichageCartes';

// tableau des images de chat
const images = [
  'chat1.png',
  'chat2.png',
  'chat3.png',
  'chat4.png',
  'chat5.png',
  'chat6.png',
  'chat7.png',
  'chat8.png',
];

// composant principal du jeu
const Jeu: React.FC = () => {
    // les hooks pour gerer les etats des cartes, messages et nombre coups
  const [cartes, setCartes] = useState<
    { id: number; image: string; estRetourne: boolean; estPareil: boolean }[]
  >([]);
  const [cartesRetournees, setCartesRetournees] = useState<number[]>([]);
  const [nombreCoups, setNombreCoups] = useState(20);
  const [message, SetMessage] = useState<string | null>(null);

  useEffect(() => {
    // initialiser les cartes aléatoirement
    const cartesMelangees = [...images, ...images]
      .sort(() => Math.random())
      .map((image, index) => ({
        id: index,
        image,
        estRetourne: false,
        estPareil: false,
      }));
    setCartes(cartesMelangees);
  }, []);

  // recupere l'id de la carte cliqué pour faire les comparaisons pour savoir si les cartes sont pareils.
  const handleCarteClick = (id: number) => {
    if (message || cartesRetournees.length >= 2) return;

    const nouvelleCartes = [...cartes];
    const carteClique = nouvelleCartes.find((carte) => carte.id === id);

    if (!carteClique || carteClique.estRetourne || carteClique.estPareil) return;

    carteClique.estRetourne = true;
    setCartesRetournees([...cartesRetournees, id]);
    setCartes(nouvelleCartes);

    if (cartesRetournees.length === 1) {
      setNombreCoups((prev) => prev - 1);

      const premiereCarte = nouvelleCartes.find((carte) => carte.id === cartesRetournees[0]);

      if (premiereCarte && premiereCarte.image === carteClique.image) {
        premiereCarte.estPareil = true;
        carteClique.estPareil = true;
        setCartesRetournees([]);
      } else {
        setTimeout(() => {
          premiereCarte!.estRetourne = false;
          carteClique.estRetourne = false;
          setCartesRetournees([]);
          setCartes([...nouvelleCartes]);
        }, 1000);
      }
    }
    // affiche le message de reussite
    if (nouvelleCartes.every((carte) => carte.estPareil)) {
        SetMessage('Bravo, tout est correct');
    } else if (nombreCoups <= 1) {
        SetMessage('Perdu, le nombres de coups est écoulé');
      setCartes(
        nouvelleCartes.map((carte) => ({ ...carte, estRetourne: true }))
      );
    }
  };

  // fonction pour relancer le jeu et le repartir de 0
  const relancerJeu = () => {
    setNombreCoups(20);
    SetMessage(null);
    setCartesRetournees([]);
    setCartes(
      [...images, ...images]
        .sort(() => Math.random())
        .map((image, index) => ({
          id: index,
          image,
          estRetourne: false,
          estPareil: false,
        }))
    );
  };

  // affichage du jeu au complet
  return (
    <Box textAlign="center" sx={{ margin: 5 }}>
      <Typography variant="h4">Jeu de Mémoire</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={relancerJeu}
        sx={{ marginTop: 3 }}
      >
        Relancer le jeu
      </Button>
      <Typography variant="h6" sx={{ margin: 2 }}>
        Coups restants : {nombreCoups}
      </Typography>
      {message && (
        <Typography variant="h5" sx={{ margin: 2, color: 'red' }}>
          {message}
        </Typography>
      )}
      
      <AffichageCarte cartes={cartes} onCarteClick={handleCarteClick} />
      
    </Box>
  );
};

export default Jeu;


