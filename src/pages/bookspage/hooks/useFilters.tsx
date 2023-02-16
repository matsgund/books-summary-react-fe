interface

// takes inn the states and set states from the parent component
const useFilters = (querySearch, setQuerySearch, queryItems, setQueryItems, refArray) => {
    // function that adds or removes queryElement from queryItems array
    const changeQueryItems = (e) => {
        const {value, checked} = e.target;
        const {items} = queryItems;
        
        // add queryElement
        if(checked) {
            setQueryItems({
                items: [...items, value],
            })
        } 
        // remove queryElement
        else {
            setQueryItems({
                items: items.filter((e) => e !==value),               
            })
            // checkbox is set to false when removed from queryItems array
            refArray.current.find(element => element.id == value).checked = false;
        } 
    }

    // function that empties the queryItems array and sets search querySearch to empty string.
    const clearQueryItems = () => {
        setQueryItems({
            items: [],
        })
        
        // set all checkboxes to false
        refArray.current.forEach(element => {
            element.checked = false;
        });

    }

    // function that handles the submit of the search form
    const handleSubmit = (e) => {
        e.preventDefault();
        setQuerySearch(e.target.elements.search.value);
    }

    return {
        changeQueryItems,
        clearQueryItems,
        handleSubmit,
    }      
}

export default useFilters;