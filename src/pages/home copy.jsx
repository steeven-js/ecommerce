import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { Alert, Button, AlertTitle } from '@mui/material';

import Iconify from 'src/components/iconify';

// Initialiser Firebase
const db = getFirestore();

const categoriesData = [
  {
    path: '#',
    title: 'Categories',
    icon: <Iconify icon="carbon:menu" sx={{ width: 1, height: 1 }} />,
    children: [
      {
        subheader: 'Collection',
        items: [
          { title: 'Nouvelle Collection', path: '#' },
          { title: 'Tendances', path: '#' },
          { title: 'Classiques', path: '#' },
        ],
      },
      {
        subheader: 'Hommes',
        items: [
          { title: 'T-shirts', path: '#' },
          { title: 'Pantalons', path: '#' },
          { title: 'Sweats', path: '#' },
          { title: 'Vestes', path: '#' },
        ],
      },
      {
        subheader: 'Femmes',
        items: [
          { title: 'Robes', path: '#' },
          { title: 'Tops', path: '#' },
          { title: 'Jupes', path: '#' },
          { title: 'Leggings', path: '#' },
        ],
      },
      {
        subheader: 'Chaussures',
        items: [
          { title: 'Running', path: '#' },
          { title: 'Basketball', path: '#' },
          { title: 'Training', path: '#' },
          { title: 'Lifestyle', path: '#' },
        ],
      },
      {
        subheader: 'Accessoires',
        items: [
          { title: 'Sacs', path: '#' },
          { title: 'Casquettes', path: '#' },
          { title: 'Chaussettes', path: '#' },
          { title: 'Équipement de sport', path: '#' },
        ],
      },
    ],
  },
];

const EcommerceLandingView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const createFirebaseCollection = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const categoriesRef = collection(db, 'categories');
      await Promise.all(
        categoriesData.categories.map((category) => addDoc(categoriesRef, category))
      );
      setMessage('Collection créée avec succès dans Firebase!');
      setSeverity('success');
    } catch (error) {
      setMessage(`Erreur lors de la création de la collection: ${error.message}`);
      setSeverity('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Page d&apos;accueil E-commerce</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={createFirebaseCollection}
        disabled={isLoading}
      >
        {isLoading ? 'Création en cours...' : 'Créer la collection Firebase'}
      </Button>
      {message && (
        <Alert severity={severity} className="mt-4">
          <AlertTitle>{severity === 'success' ? 'Succès' : 'Erreur'}</AlertTitle>
          {message}
        </Alert>
      )}
      {/* Ajoutez ici le reste du contenu de votre page d'accueil e-commerce */}
    </div>
  );
};

const HomePage = () => (
  <>
    <Helmet>
      <title>E-commerce Sportswear - Accueil</title>
    </Helmet>
    <EcommerceLandingView />
  </>
);

export default HomePage;
