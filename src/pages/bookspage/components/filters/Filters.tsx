
import React, { useContext } from 'react';
import FilterItem from '../filter-item/FilterItem';
import { FiltersContext } from '../../BooksPage';
import { FilterContextProps } from './FiltersInterface';

const Filters = () => {

    const { queryItems, changeQueryItems, clearQueryItems } = useContext(FiltersContext) as FilterContextProps;

    return  (
        <>
            {queryItems.items.length > 0 ?
                [
                    ...queryItems.items.map((item, i) => (
                    <FilterItem key={i} item={item} func={changeQueryItems} />
                    )),
                    <FilterItem key={"remove"} item="Remove all filters" func={clearQueryItems} />
                ] :
                null
            }   
          </> 
    )
}

export default Filters;