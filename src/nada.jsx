Excelente pregunta!

A continuación, te proporciono un ejemplo de cómo hacer peticiones a Firebase Realtime Database y Cloud Firestore con React sin instalar la biblioteca de Firebase:

*Firebase Realtime Database*
Puedes hacer peticiones a Firebase Realtime Database utilizando la API de Firebase REST de la siguiente manera:

```
import React, { useState, useEffect } from 'react';

const url = 'https://tu-proyecto.firebaseio.com/usuarios.json';

const MiComponente = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer TU_TOKEN_DE_ACCESO',
      },
    })
    .then((response) => response.json())
    .then((data) => setDatos(data))
    .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {datos.map((dato) => (
        <p key={dato.id}>{dato.nombre}</p>
      ))}
    </div>
  );
};

export default MiComponente;
```

*Firebase Cloud Firestore*
Puedes hacer peticiones a Firebase Cloud Firestore utilizando la API de Firebase REST de la siguiente manera:

```
import React, { useState, useEffect } from 'react';

const url = 'https://firestore.googleapis.com/v1/projects/tu-proyecto/databases/(default)/documents/usuarios';

const MiComponente = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer TU_TOKEN_DE_ACCESO',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => setDatos(data.documents))
    .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {datos.map((dato) => (
        <p key={dato.name}>{dato.fields.nombre.stringValue}</p>
      ))}
    </div>
  );
};

export default MiComponente;
```

*Reglas de Firebase*
Para configurar las reglas de Firebase, debes ir a la consola de Firebase y seleccionar tu proyecto. Luego, debes ir a la sección "Realtime Database" o "Cloud Firestore" y hacer clic en "Reglas".

A continuación, te proporciono un ejemplo de cómo configurar las reglas de Firebase para permitir el acceso a los datos:

*Reglas de Firebase Realtime Database*
```
{
  "rules": {
    "usuarios": {
      ".read": "true",
      ".write": "true"
    }
  }
}
```

*Reglas de Firebase Cloud Firestore*
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{usuario} {
      allow read, write: if true;
    }
  }
}
```

Recuerda que estas reglas permiten el acceso a los datos sin restricciones, por lo que debes adaptarlas a tus necesidades específicas.

Es importante tener en cuenta que hacer peticiones a Firebase sin instalar la biblioteca puede ser menos eficiente y menos seguro que utilizar la biblioteca de Firebase.