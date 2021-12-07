import axios from "axios";
import { useEffect, useState } from "react";
import Cars from "./Components/Cars";
import NewCar from "./Components/NewCar";
import Modal from "./Components/Modal";
import Statistic from "./Components/Statistic";
import { useRef } from "react";
import Filter from "./Components/Filter";
import carsSort from "./Common/carsSort";
import Message from "./Components/Message";

function App() {
  // TEST
  useEffect(() => {
    axios.get('http://localhost:3003/test')
      .then(res => {
        console.log(res.data);
      })
  }, [])
  // -----------------------START----------------------
  const [cars, setCars] = useState([]);
  const [updateInformation, setUpdateInformation] = useState(Date.now());

  // READ
  useEffect(() => {
    axios.get('http://localhost:3003/cars')
      .then(res => {
        setCars(res.data);
        console.log(res.data);
      })
  }, [updateInformation])

  // DELETE
  const deleteCar = (id) => {
    setShowModal(false);
    axios.delete('http://localhost:3003/cars/' + id)
      .then(res => {
        addMsg('Skrydis ištrintas!')
        setUpdateInformation(Date.now())
        console.log(res.data);
      })
  }

  // CREATE
  const createInputs = car => {
    axios.post('http://localhost:3003/cars', car)
      .then(res => {
        addMsg('Skrydis sukurtas!')
        setUpdateInformation(Date.now())
        console.log(res.data);
      })
  }

  // EDIT
  const editInputs = (car, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/cars/' + id, car)
      .then(res => {
        addMsg('Sk redaguotas!')
        setUpdateInformation(Date.now())
        console.log(res.data);
      })
  }

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState({
    id: '',
    plate: '',
    weight: '',
    pasangers: '',
    priority: false
  });

  const modal = (car) => {
    setShowModal(true);
    setModalElement(car);
  }

  const hideModal = () => {
    setShowModal(false);
  }

  // STATISTIC
  const [stats, setStats] = useState({
    carsCount: 0,
    carsWeight: 0,
    carsAverage: 0
  })

  useEffect(() => {
    axios.get('http://localhost:3003/stats')
      .then(res => {
        setStats(res.data[0]);
        console.log(res.data);
      })
  }, [updateInformation])

  // SORT
  const sortBy = useRef('');
  const sort = (by) => {
    setCars(carsSort(cars, by))
    sortBy.current = by;
  }

  //  SIMPLE SORT WITH BUTTONS
  const simpleSort = by => {
    const carsCopy = cars.slice();
    if ('weight' === by) {
      carsCopy.sort((a, b) => a.weight - b.weight)
      setCars(carsCopy);
    }
    if ('pasangers' === by) {
      carsCopy.sort((a, b) => a.pasangers - b.pasangers)
      setCars(carsCopy);
    }
  }

  // RESET DATA
  const resetData = () => {
    setUpdateInformation(Date.now());
  }

  // MESSAGE
  const [showMsg, setShowMsg] = useState(false);
  const msg = useRef('labas');

  const addMsg = text => {
    msg.current = text;
    setShowMsg(true);
    setTimeout(() => { clearMsg() }, 2000);
  }

  const clearMsg = () => {
    setShowMsg(false);
  }
// SEARCH
const [searchBy, setSearchBy] = useState('');
  useEffect(() => {
    if (searchBy) {
      axios.get('http://localhost:3003/cars-search/?s=' + searchBy)
        .then(res => {
          setCars(carsSort((res.data), sortBy.current));
          console.log(res.data);
        })
    }
  }, [searchBy])
  
  return (
    <div className='general'>
      <h1> <span>Skrydžių</span> informacija</h1>
      <Message showMsg={showMsg} msg={msg.current} />
      <NewCar createInputs={createInputs} />
      <Filter sort={sort} simpleSort={simpleSort} resetData={resetData} setSearchBy={setSearchBy}/>
      <Statistic stats={stats} />
      <Modal deleteCar={deleteCar} hideModal={hideModal} showModal={showModal} modalElement={modalElement} editInputs={editInputs} />
      <Cars cars={cars} deleteCar={deleteCar} modal={modal} />
    </div>
  );
}
export default App;