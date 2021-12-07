function Car({ car, deleteCar, modal }) {

// MODALO RODYMAS PASPAUDUS REDAGUOTI MYGTUKĄ
    const showEdit = () => {
        modal(car)
    }

    // PRIORITY VALIDACIJA
    const prio = (p) => {
        if (p === 1) {
            return 'Taip';
        } else {
            return 'Ne';
        }
    }

    return (
        <>
            <div className='list'>
                <h2>skrydis</h2>
                
                <span>Iš miesto: </span>
                <div className='each-item'>
                    <div>{car.plate}</div>
                </div>
                <span>Oro linijos: </span>
                <div className='each-item'>
                    <div>{car.weight}</div>
                </div>
                <span>Atvykimo laikas: </span>
                <div className='each-item'>
                    <div>{car.pasangers}</div>
                </div>
                
                <button onClick={() => deleteCar(car.id)}>Trinti</button>
                <button onClick={showEdit}>Redaguoti</button>
            </div>
        </>
    );

}
export default Car;