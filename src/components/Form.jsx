import React, {useState} from 'react'
import Error from './Error'

const Form = ({setSearch}) => {
    
    const [concept, setConcept] = useState('')
    const [error, setError] = useState(false)

    const searchImages = e => {
        e.preventDefault()

        //validad
        if(concept.trim() === '') {
            setError(true)
            return
        }
        setError(false)
        //enviar el término de busqueda al componente principal
        setSearch(concept)
    }
    return (
        <form onSubmit={searchImages}>
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input 
                    type="text" 
                    className='form-control form-control-lg' 
                    placeholder='Busca una imagen, ejemplo: futbol o café' 
                    onChange={ e => setConcept(e.target.value)}/>
                </div>

                <div className='form-group col-md-4'>
                    <input type='submit' className="btn btn-lg- btn-danger btn-block" value='Buscar'/>
                </div>

            </div>
            {error ? <Error message = 'Agrega un término de búsqueda'/> : null}
        </form>
    )
}

export default Form