import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'; 
import './App.css'


function App() {
 
  
	  
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null); 
	const [nomPeli, setnomPeli] = useState("");
	const [plataforma, setPlataforma] = useState("");
	const [numRan, setnumRan] = useState("");
  const [arrpelis, setArrpelis] = useState([]);
 


  const handleSubmit = (evento) => {
    evento.preventDefault();
    
  };
  
 
   useEffect(() => {
      const fetchData = async () => {
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
    fetchData();

    
  }, []);

    

  let printArr = () => {

 

 
    console.log("miz ------",typeof( arrpelis))
  
  }

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
       useEffect
        console.log("Success:", response)
        })
        
         
  }
  
  
  const randomPeli = () => {
       
 
    setnumRan(Math.floor(Math.random() * (arrpelis.length)))
      
      console.log(numRan)
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
            <h2>Agregar película</h2>
            
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

             
            <Button onClick={agregarPeli}  >
                Agregar peli   
            </Button>
            </Form>

              
             
            
            <Button onClick={printArr}  >
              Actualizar lista 
              </Button>
            </Col>
          
          <Col xs sm md={8} lg={8} xl={8} >
            
            <Card  border="warning" style={{ width: '33rem' }}>
              <Card.Body>
                <Card.Title >
                  <span
                    className='tit-list'>
                      Lista de pelis
                  </span>
                </Card.Title>
              
                < >
                  {
                    arrpelis == ''
                      ?console.log("nada en arrpelis ")
                      : console.log('si hay algo arrpelis', arrpelis['id'])
                    
                  }
                    {
         
                    arrpelis != "No hay resultados. </br> "
                    && arrpelis != []
                      ? 

                      
                     
                     arrpelis.map((el,index) => {

                       
                       return(
                        <Card.Text  className='ele-list' key={index}>
                            {el.nombre} -
                          {el.plataforma} 
                          {
                            console.log('el',el)
                            
                          }
                           </Card.Text>
                       )
                      })
                     
                      
                     
                      : "nada"
                    }   
                </ >
          
              </Card.Body>
            </Card>
              
            </Col>
              
          </Row>              
                
        </Container>
        
        	 
      <Container fluid>
				<Row    >
					             
          <Col  xs sm md={4} lg={4} xl={4} xxl={4} >
               <h2>Elegir al azar</h2>
            <Button variant="success" onClick={randomPeli}  >
              aleatorio
            </Button>
          </Col>


          <Col xs sm md={8} lg={8} xl={8} xxl={4}  >
            <h2 className='mt-2'>Pelicula elegida  </h2>   

          
            <p className='peli-elegida'>
          
              {arrpelis[numRan]}
            </p>
            
          </Col>
				</Row>
          
      </Container>
      
    </>
  )
}

export default App
