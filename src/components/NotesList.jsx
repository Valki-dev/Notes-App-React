import { useState } from 'react';
import notesService from '../services/notesService';
import './NotesList.css'

const NotesList = ({ notes, setNotes }) => {
    const [modal, setModal] = useState({ id: -1, bgColor: "", activated: false });
    const [newDescription, setNewDescription] = useState("");

    function drag(event, id) {
        event.dataTransfer.setData("id", id);
    }

    const handleSetNewDescription = (event) => {
        let description = event.target.value;
        setNewDescription(description);
    }

    const activateModal = (id, bgColor) => {
        setModal({...modal, id: id, bgColor: bgColor, activated: true });
    }
    
    const updateNote = () => {
        if(newDescription.trim() != "") {
            const note = {
                id: modal.id,
                description: newDescription,
                backgroundColor: modal.bgColor
            }
            
            notesService.updateNote(note);
            setNotes(notes.map(noteInArray => noteInArray.id == note.id ? note : noteInArray));
        }
        setModal({...modal, activated: false})
        
    }
    
    return (
        <>
            <div className="col-12 col-lg-10">
                <div className="card notesContainer">
                    <div className="card-body">
                        {
                            modal.activated &&
                            <div className='modal show' tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Modificar nota:</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="updateModal" aria-label="Close" onClick={() => setModal({...modal, activated: false})}></button>
                                        </div>
                                        <div className="modal-body d-flex justify-content-center">
                                            <input type="text" className='form-control updateInput'placeholder='Escribe algo...' value={newDescription} onChange={() => handleSetNewDescription(event)} />
                                        </div>
                                        <div className="modal-footer d-flex justify-content-around">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="updateModal" onClick={() => setModal({...modal, activated: false})}>Cerrar</button>
                                            <button type="button" className="btn btn-primary" onClick={updateNote} >Modificar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row  d-flex justify-content-start">
                            {
                                notes.map(({ id, description, backgroundColor }) => {
                                    return (
                                        <div className="col-12 col-lg-2 mt-3 mb-3" key={id}>
                                            <div className="card note me-2" draggable="true" onDragStart={() => drag(event, id)} style={{ backgroundColor: backgroundColor }}>
                                                <div className="card-body">
                                                    <b onDoubleClick={() => activateModal(id, backgroundColor)}>{description}</b>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesList;