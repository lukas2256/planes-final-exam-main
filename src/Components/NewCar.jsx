import { useState } from "react";

function NewCar({createInputs }) {

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

    const handleCreate = () => {
        if (inputs.id === '') {
            alert('Miesto laukelis negali būti tuščias - automatiškai bus priskirta reikšmė!');
            inputs.id = '999';
        }
        if (inputs.plate === '') {
            alert('Oro linijos laukelis negali būti tuščias - redaguokite informaciją!');
            inputs.plate = 'DEFAULT';
        }
        if (inputs.weight === '') {
            alert('Atvykimo laiko laukelis negali būti tuščias - redaguokite informaciją!');
            inputs.weight = 0;
        }
        if (inputs.pasangers === '') {
            alert('Šis laukelis negali būti tuščias - automatiškai bus priskirta reikšmė!');
            inputs.pasangers = 0;
        }
        createInputs(inputs);
        setInputs({
            id: '',
            plate: '',
            weight: '',
            pasangers: '',
            priority: false
        })
    }

    return (
        <>
            <h2>Registruoti skrydį</h2>
            <div className='new-item'>
               
                <div className='each-new-item'>
                    <span>Iš miesto: </span> 
                    <input type='text'  placeholder='įvesti miestą'/>
                </div>
                <div className='each-new-item'>
                    <span>Oro linijos: </span> 
                    <input type='text'  placeholder='įvesti oro linijas'/>
                </div>
                <div className='each-new-item'>
                    <span>Atvykimo laikas: </span> 
                    <input type='text' placeholder='įvesti atvykimo laiką'/>
                </div>
                
                <div className='each-new-item'>
                    <button onClick={handleCreate}>Pridėti</button>
                </div>
            </div>
        </>
    );
}
export default NewCar;