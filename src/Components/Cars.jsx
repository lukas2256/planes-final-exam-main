import Car from "./Car";

function Cars({ cars, deleteCar, modal }) {
    return (
        <div className='extra-list'>
            {cars.map(car => <Car key={car.id} car={car} deleteCar={deleteCar} modal={modal}></Car>)};
        </div>
    );

}
export default Cars;