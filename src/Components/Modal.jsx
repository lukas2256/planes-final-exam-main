import { useEffect, useState } from "react";

function Modal({ showModal, hideModal, modalElement, editInputs, deleteCar }) {

    const [inputs, setInputs] = useState({
        id: '',
        plate: '',
        weight: '',
        pasangers: '',
        priority: false
    })

    const controlInputs = (e, what) => {
        const inputsCopy = { ...inputs };
        inputsCopy[what] = e.target.value;
        if (what === 'priority') {
            inputsCopy[what] = !inputs.priority;
        }
        setInputs(inputsCopy);
    }

    useEffect(() => {
        setInputs({
            id: modalElement.id,
            plate: modalElement.plate,
            weight: modalElement.weight,
            pasangers: modalElement.pasangers,
            priority: modalElement.priority
        })
    }, [modalElement])

    const handleEdit = () => {
        if (inputs.weight === '') {
            alert('WEIGHT laukelis negali būti tuščias - redaguokite informaciją teisingai!');
            inputs.weight = 0;
        }
        if (inputs.pasangers === '') {
            alert('PASANGERS laukelis negali būti tuščias - redaguokite informaciją teisingai!');
            inputs.pasangers = 0;
        }
        editInputs({
            id: inputs.id,
            plate: inputs.plate,
            weight: inputs.weight,
            pasangers: inputs.pasangers,
            priority: inputs.priority
        }, modalElement.id)
    }

    // PRIORITY VALIDACIJA
    const prio = (p) => {
        if (p === 1) {
            return '1';
        } else {
            return '0';
        }
    }

    return (

        <div className='general-modal' style={{ display: showModal ? 'block' : 'none', top: window.scrollY + 100 + 'px' }}>
            <h2>Redaguoti</h2>
            <div className='each-modal'>
                <span>Identifikavimo numeris: </span>
                <input type="text" value={inputs.id} onChange={(e) => controlInputs(e, 'id')} readOnly />
            </div>
            <div className='each-modal'>
                <span>Plate-valstybinis numeris: </span>
                <input type='text' value={inputs.plate} onChange={(e) => controlInputs(e, 'plate')} readOnly />
            </div>
            <div className='each-modal'>
                <span>Svoris tonomis: </span>
                <input type='text' value={inputs.weight} onChange={(e) => controlInputs(e, 'weight')} readOnly />
            </div>
            <div className='each-modal'>
                <span>Naujo svorio įvedimas tonomis: </span>
                <input type='text' value={inputs.weight} onChange={(e) => controlInputs(e, 'weight')} onKeyPress={(event) => { if (!/[.,0-9]/.test(event.key)) { event.preventDefault(); } }} />
            </div>
            <div className='each-modal'>
                <span>Keleivių skaičius: </span>
                <input type='text' value={inputs.pasangers} onChange={(e) => controlInputs(e, 'pasangers')} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} />
            </div>
            <div className='each-modal'>
                <span>Prioritetas registracijai: </span>
                <input type='checkbox' value={inputs.priority} onChange={(e) => controlInputs(e, 'priority')} checked={inputs.priority} />
            </div>
            <div className='each-modal'>
              
            </div>
            <div className='each-modal'>
                <button onClick={handleEdit}>Išsaugoti</button>
                <button onClick={hideModal}>Grįžti</button>
                <button onClick={() => deleteCar(modalElement.id)}>Ištrinti</button>
            </div>
        </div>
    );
}
export default Modal;