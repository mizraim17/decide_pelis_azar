import React from 'react';
import imagen1 from './assets/imagen1.jpg';
import imagen2 from './assets/imagen2.jpg';
import imagen3 from './assets/imagen3.jpg';

function MiComponente({ arreglo }) {
  return (
    <div>
      {arreglo.map((elemento, index) => {
        let imagen;
        switch (elemento) {
          case 'elemento1':
            imagen = imagen1;
            break;
          case 'elemento2':
            imagen = imagen2;
            break;
          case 'elemento3':
            imagen = imagen3;
            break;
          default:
            imagen = imagen1; // imagen default
        }
        return <img key={index} src={imagen} alt={elemento} />;
      })}
    </div>
  );
}
