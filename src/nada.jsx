 
const eliminarRegistro = async (id) => {
  try {
    const respuesta = await fetch(`https://mi-proyecto.firebaseio.com/registros/${id}.json`, {
      method: 'DELETE',
    });
    if (respuesta.ok) {
      console.log('Registro eliminado con éxito');
    } else {
      console.error('Error al eliminar el registro');
    }
  } catch (error) {
    console.error(error);
  }
};
 
 