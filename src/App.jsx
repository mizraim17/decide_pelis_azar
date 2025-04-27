import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; 
import './App.css'


import { AiOutlineClose } from 'react-icons/ai';


function App() {
 	  
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null); 
	const [nomPeli, setnomPeli] = useState("");
	const [plataforma, setPlataforma] = useState('');
	const [numRan, setnumRan] = useState('');
  const [arrpelis, setArrpelis] = useState([]);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    
  };
  
  useEffect(() => {
 
      const obtenerDatos = async () => {
        try {
          let arregloDeObjetos 
          const respuesta = await fetch(`https://wepapp-angular-default-rtdb.firebaseio.com/pelis.json`)
          
          const objetoDeObjetos = await respuesta.json();
 
          objetoDeObjetos !== null
            ?  arregloDeObjetos = Object.keys(objetoDeObjetos).map((id) => ({
            id,
            ...objetoDeObjetos[id],
             }))
            : console.log("es nuelllo");
          
          console.log('objetoDeObjetos',objetoDeObjetos);
          
            
          objetoDeObjetos
            ?            setArrpelis(arregloDeObjetos)
            :''
        
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
  };
  
  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (

    <>
   
      <Container  >
        <h1 className='title pb-5'  >Elegir una pelicula al azar</h1>
        
        <Row>
          
            <Col    xs={12} sm={12} md={4} lg={4} xl={4}  >
            <h2 className='tit'>Agregar película</h2>
            
            <Form className='mt-3' onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nomPeli">
            
                <Form.Control type="text" placeholder="Nombre de la peli"   onChange={(evento) => setnomPeli(evento.target.value)} value={nomPeli} />
                
              </Form.Group>

              <Form.Group className="mb-3" controlId="plataforma">
                

                 <Form.Select aria-label="Default select example"    value={plataforma} onChange={(evento) => setPlataforma(evento.target.value)}   >
                    <option value="" selected>
                      Plataforma
                  </option>
                  <option value="Netflix">
                    Netflix</option>
                  <option value="MAX">
                    MAX
                  </option>
                  <option value="Apple">
                    Apple TV
                  </option>
                  <option value="Disney">
                    Disney
                  </option>
                    <option value="Prime">
                    Prime
                  </option>
                   </Form.Select>
                
               
                
              </Form.Group> 

            
            <Button onClick={agregarPeli} >
                Agregar peli   
            </Button>
            </Form>
      
            </Col>
          
            <Col className='mar-temp' xs={12} sm={12} md={8} lg={8} xl={8} >
            
            <Card  border="danger"   >
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
                      <div className='col-12   col-md-6 col-lg-6 d-flex justify-content-start align-items-center  ' key={index}>
                        <div  className='d-flex justify-content-start' >
                          <Card.Text  className='ele-list' >
            
                            { el.plataforma == 'Netflix' ?
                              <img key={index} className='icons' src="netflix.avif" alt="netflix" />
                              :
                              el.plataforma == 'MAX'?
                              < img key={index} className='icons' src="max.avif" alt="MAX" />
                                :
                                   el.plataforma == 'Prime'?
                                  < img key={index} className='icons' src="prime.avif" alt="Prime" />
                                  : el.plataforma == 'Disney'
                                  ?
                                    < img key={index} className='icons' src="disney.avif" alt="netflix" />
                                    :el.plataforma == 'Apple'
                                    ?
                                      < img key={index} className='icons' src="apple.avif" alt="Apple" />
                                      :''
                            }
                         
                            - {el.nombre} 
                           
                         
                          </Card.Text>
                        </div>

                        <div className=' d-flex' >
                          <Button className='ms-2 mb-3 mt-2  '   variant="danger"
                            onClick={
                              () => eliminarPeli(el.id)}
                          >
                    
                            <AiOutlineClose />
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
        
        	 
      <Container fluid   className='mt-2'>
				<Row    >
					             
          <Col   xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} >
            <h2 className='tit'>Peli al azar</h2>
            
            <Button variant="success" onClick={randomPeli}  >
              aleatorio
            </Button>
          </Col>


          <Col className='cuadro' xs={12} sm={12} md={8} lg={8} xl={8} xxl={4}  >
            <p className='tit-fin mt-2 text-center'>
              Pelicula elegida
               
            </p>   
       
            <p className='peli-elegida'>
              
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
