 
 
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  databaseURL: 'TU_DATABASE_URL',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db;
 
import React, { useState, useEffect } from 'react';
import db from './firebase';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const obtenerPeliculas = async () => {
      const respuesta = await fetch(`${db.databaseURL}/peliculas.json`);
      const datos = await respuesta.json();
      setPeliculas(datos);
    };
    obtenerPeliculas();
  }, []);

  return (
    <div>
      <h1>Peliculas</h1>
      <ul>
        {
          peliculas.map((pelicula) => (
          <li key={pelicula.id}>{pelicula.titulo}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default Peliculas;
```
 
const db = firebase.database();
const peliculasRef = db.ref('peliculas');

export default peliculasRef;
 

 