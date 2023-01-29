import { useEffect, useState } from 'react'
import './App.css'
import logo_color from './assets/logo_color.png'
import NotesList from './components/NotesList'
import notesService from './services/notesService'
import cuboCerrado from './assets/cuboCerrado.png'
import cuboAbierto from './assets/cuboAbierto.png'

function App() {
  const [notes, setNotes] = useState([]);
  const [description, setDescription] = useState("");
  const [bgColor, setBgColor] = useState("#0BADAE");
  const [img, setImg] = useState(cuboCerrado);
  

  useEffect(() => {
    notesService.getAll().then(result => setNotes(result))
      .catch(error => console.log('error', error));

    return () => { }
  }, [])

  const handleSetDescription = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  }

  const handleSetBgColor = (event) => {
    const newBackgroundColor = event.target.value;
    setBgColor(newBackgroundColor);
  }

  const addNote = () => {
    if (description.trim() != "") {
      const note = {
        id: notes.length + 1,
        description: description,
        backgroundColor: bgColor
      }
      notesService.createNote(note);
      let notesCopy = [...notes];
      notesCopy.push(note);
      setNotes(notesCopy)
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
    setImg(cuboAbierto)
  }

  function drop(event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("id");
    notesService.deleteNote(id);
    let notesCopy = [...notes];
    let index = notesCopy.findIndex(noteInArray => noteInArray.id == id);
    notesCopy.splice(index, 1);
    setNotes(notesCopy);
    setImg(cuboCerrado);
  }

  function closeTrash() {
    setImg(cuboCerrado)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12 p-3" id='header'>
            <h2>Valki Notes App</h2>
          </div>
        </div>
        {/**Create note */}
        <div className="row">
          <div className="col-12 col-lg-12 mt-5 d-flex justify-content-center align-items-center">
            <div>
              <input type="text" className='form-control me-3' id='descriptionInput' placeholder='Escribe algo...' value={description} onChange={handleSetDescription} />
            </div>
            <div>
              <input type="color" className='form-control me-3' id='colorInput' value={bgColor} onChange={handleSetBgColor} />
            </div>
            <div>
              <button className='btn btn-info' onClick={addNote}>Añadir nota</button>
            </div>
          </div>
        </div>
        {/**Notes list */}
        <div className="row mt-5">
          {
            notes.length <= 0 &&
            <div className="col-12 col-lg-12 main"></div>
          }

          {
            notes.length > 0 &&
            <div className="container d-flex justify-content-center main">
              <NotesList notes={notes} setNotes={setNotes}></NotesList>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 mb-5 d-flex justify-content-end">
            <div onDrop={() => drop(event)} onDragOver={() => allowDrop(event)} onDragLeave={closeTrash}>
              <img src={img} alt="Imagen no disponible" width={100} className="me-5" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 p-2 d-flex justify-content-center" id='footer'>
            <a href="https://github.com/Valki-dev" target="_blank" id='adminURL'>
              <div className='d-flex flex-column align-items-center'>
                <img src={logo_color} alt="Logo no disponible" width={100} />
                <p>Valki_dev</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
