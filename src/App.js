import React, {useState, useEffect} from 'react';
import Form from './components/Form'
import ImagesList from './components/ImagesList'


function App() {

  //state de la app
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const consultAPI = async() => {
      
      if(search === '') return
  
      const imagePage = 30
      const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=${search}&per_page=${imagePage}&page=${actualPage}`
  
      const answer = await fetch(url)
      const result= await answer.json()
  
      setImages(result.hits)

      //calcular el total de paginas
      const calculateTotalPages = Math.ceil(result.totalHits / imagePage)
      setTotalPages(calculateTotalPages)

      //mover la pantalla arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth'})
    }
    consultAPI()
  }, [search, actualPage])

  //definir página anterior
  const previousPage = () => {
    const newPageActual = actualPage - 1
    if(newPageActual === 0) return
    setActualPage(newPageActual)
  }
  //definir página siguiente
  const nextPage = () => {
    const newPageActual = actualPage + 1
    if(newPageActual > totalPages) return
    setActualPage(newPageActual)
  }

  return ( 
    <div className='containter'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes</p>
        <Form setSearch={setSearch} />
      </div>

      <div className='row justify-content-center'>
        <ImagesList images={images} />

        { (actualPage === 1)? null : (
          <buttom type='button' className='btn btn-info mr-1' onClick={previousPage}>&laquo;Anterior </buttom>
        )}
        { (actualPage === totalPages ) ? null : (
          <buttom type='button' className='btn btn-info' onClick={nextPage}>&raquo;Siguiente </buttom>

        )}
      </div>
    </div>
  );
}

export default App;
