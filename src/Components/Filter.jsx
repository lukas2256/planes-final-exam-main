import { useState } from "react";


function Filter({ sort, simpleSort, resetData, setSearchBy }) {

    // RŪŠIAVIMAS
    const [sortValue, setSortValue] = useState('');

    const selectSort = e => {
        setSortValue(e.target.value);
        sort(e.target.value);
    }

    // ATSTATYTI DUOMENIS
    const resetHandler = () => {
        resetData();
        sort('');
        setSortValue('');
        setSearchValue('');
    }

    //    PAIEŠKA
    const [searchValue, setSearchValue] = useState('');
    const handleSearchValue = e => {
        setSearchValue(e.target.value);
        setSearchBy(e.target.value);
    }
    return (
        <>
            <h2>Rūšiuoti skrydžius</h2>
            <div className='general-filter'>
                {/* RŪŠIAVIMAS */}
              
                {/* PAPRASTAS RŪŠIAVIMAS */}
                <div className='each-filter'>
                    <span>Rūšiavimas pagal: </span>
                    <button onClick={() => simpleSort("weight")}>Pagal atvykimą</button>
                    <button onClick={() => simpleSort("pasangers")}>Pagal miestą</button>
                    <button onClick={resetHandler}>Trinti </button>
                </div>
            </div>
        </>
    );
}
export default Filter;