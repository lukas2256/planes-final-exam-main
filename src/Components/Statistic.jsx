function Statistic({ stats }) {

    return (
        <div>
            <h2>Statistika</h2>
            <div className='statistic-results'>
                <span>Reisų kiekis: <i>{stats.carsCount}</i></span>
                <span>Vėluoja: <i style={{color: stats.carsWeight > 50 ? 'blue' : '#f65058ff' }}>{stats.carsWeight}</i> vnt.</span>
                <span>Atvyko laiku: <i style={{color: stats.carsWeight > 50 ? 'blue' : '#f65058ff' }}>{stats.carsWeight}</i> vnt.</span>

            </div>
        </div>
    )
}
export default Statistic;