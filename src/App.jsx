import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; 
import './App.css'


function App() {
 
  
	  
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null); 
	const [nomPeli, setnomPeli] = useState("");
	const [plataforma, setPlataforma] = useState("");
	const [numRan, setnumRan] = useState('');
  const [arrpelis, setArrpelis] = useState([]);
 


  const handleSubmit = (evento) => {
    evento.preventDefault();
    
  };
  
   useEffect(() => {
      const obtenerDatos = async () => {
        try {
          const respuesta = await fetch(`https://wepapp-angular-default-rtdb.firebaseio.com/pelis.json`)
          
          const objetoDeObjetos = await respuesta.json() ;

          const arregloDeObjetos = Object.keys(objetoDeObjetos).map((id) => ({
            id,
            ...objetoDeObjetos[id],
          }));

          setArrpelis (arregloDeObjetos);
          setCargando(false);

         
          
        } catch (error) {
          setError(error);
          setCargando(false);
        }
      };
    obtenerDatos();
  }, []);


    const obtenerDatos = async () => {
    try {
      const respuesta = await fetch('https://wepapp-angular-default-rtdb.firebaseio.com/pelis.json');
     
       const objetoDeObjetos = await respuesta.json() ;

          const arregloDeObjetos = Object.keys(objetoDeObjetos).map((id) => ({
            id,
            ...objetoDeObjetos[id],
          }));
      
      setArrpelis(arregloDeObjetos);
    } catch (error) {
      console.error(error);
    }
  };
    
  const eliminarPeli = async (id) => {
  try {
    const respuesta = await fetch(`https://wepapp-angular-default-rtdb.firebaseio.com/pelis/${id}.json`, {
      method: 'DELETE',
    });
    if (respuesta.ok) {
        
      
      console.log('Registro eliminado con éxito');
              obtenerDatos()
    } else {
      console.error('Error al eliminar el registro');
    }
  } catch (error) {
    console.error(error);
  }
};

  let agregarPeli = () => {
     
    let data = 
    {
      nombre: ` ${nomPeli}`,
      plataforma:  `${plataforma}`
      }
    

        console.log('data-----',data);
    

    fetch(`https://wepapp-angular-default-rtdb.firebaseio.com/pelis.json`, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or  
      headers: {
        "Content-Type": "application/json",
      },
    })

    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
      .then((response) =>
      
      {
        obtenerDatos()
        console.log("Success:", response)
        })
         
    setnomPeli('')
    setPlataforma('')
  }
  
  const randomPeli = () => {
       
 
    setnumRan(  Math.floor(Math.random() * (arrpelis.length)))
      
    // console.log( "tamaño array" ,arrpelis.length)
    console.log( "numero aleatorio" ,numRan)
    
    console.log(' arrpelis', arrpelis);
   
  };
  
    if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (

    <>
      
        <Container fluid>
						<h1 className='title pb-5'  >Elegir Peliculas al Azar</h1>
          <Row>
          
            <Col  className=' ' xs sm md={4} lg={4} xl={4}  >
            <h2 className='tit'>Agregar película</h2>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nomPeli">
                <Form.Label>Pelicula</Form.Label>
                <Form.Control type="text" placeholder="
                Nombre de la peli"   onChange={(evento) => setnomPeli(evento.target.value)} value={nomPeli} />
                 
              </Form.Group>

                <Form.Group className="mb-3" controlId="plataforma">
                <Form.Label>Plataforma</Form.Label>
                <Form.Control type="text" placeholder="
                  plataforma  "  onChange={(evento) => setPlataforma(evento.target.value)} value={plataforma} />
                 
                </Form.Group>

             
            <Button onClick={agregarPeli} >
                Agregar peli   
            </Button>
            </Form>
      
            </Col>
          
            <Col xs sm md={8} lg={8} xl={8} >
            
            <Card  border="warning" style={{ width: '33rem' }}>
              <Card.Body>
                <Card.Title >
                  <h2
                    className='tit-list'>
                      Lista de sugerencia pelis
                  </h2>
                </Card.Title>
              <div className="d-flex row ">
                  
                {
                  arrpelis != "No hay resultados. </br> "
                  && arrpelis != []
                  ?                     
                  arrpelis.map((el,index) => {
              
                    return (
                      <div className='d-flex justify-content-between' key={index}>
                        <div  >
                          <Card.Text  className='ele-list' >
                            {el.nombre} -
                            {el.plataforma}                
                          </Card.Text>
                        </div>

                         <div >
                          <Button className='ps-2  '   variant="danger"
                            onClick={
                              () => eliminarPeli(el.id)}
                          >
                    
                            Eliminar
                          </Button>                        
                        </div>
                      </div>
                    )
                  })       
                    : "nada"
                }
                    
              </div>
          
              </Card.Body>
            </Card>
              
            </Col>
              
          </Row>              
                
        </Container>
        
        	 
      <Container fluid>
				<Row    >
					             
          <Col  xs sm md={4} lg={4} xl={4} xxl={4} >
            <h2 className='tit'>Elegir al azar</h2>
            
            <Button variant="success" onClick={randomPeli}  >
              aleatorio
            </Button>
          </Col>


          <Col xs sm md={8} lg={8} xl={8} xxl={4}  >
            <h2 className='tit-fin mt-2'>
              Pelicula elegida
            </h2>   

          
            <p className='peli-elegida'>

   
              {

              numRan!=''&&  numRan!='nada'
                  ?
                   console.log("peli elegida", arrpelis[numRan]['nombre'])
                  :    console.log("numRan vacio", numRan)
             
             
            }
              
               {
                
                 numRan!==''
                  ?
                    `${arrpelis[numRan]['nombre']} 
                    -  ${arrpelis[numRan]['plataforma']}`
          
                  :
                    <span>{numRan}</span>              
              }
            </p>
            
          </Col>
				</Row>
          
      </Container>
      
    </>
  )
}

export default App
