
function carsSort(state, by) {
    const carsCopy = state.slice();

    switch (by) {
              case 'weight_asc':
            carsCopy.sort((a, b) => {
                return a.weight - b.weight;
            });
            break;
        case 'weight_desc':
            carsCopy.sort((a, b) => {
                return b.weight - a.weight;
            });
            break;
            case 'pasangers_asc':
                carsCopy.sort((a, b) => {
                    return a.pasangers - b.pasangers;
                });
                break;
            case 'pasangers_desc':
                carsCopy.sort((a, b) => {
                    return b.pasangers - a.pasangers;
                });
                break;
            
        default:
    }
    return carsCopy;
}
export default carsSort;