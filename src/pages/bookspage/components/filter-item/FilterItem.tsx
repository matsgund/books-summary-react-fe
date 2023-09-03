import classes from './FilterItem.module.css';
import { ImCross } from 'react-icons/im';
import { ChangeEvent } from 'react';

interface FilterItemProps {
  item: string;
  func: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilterItem = ({ item, func }: FilterItemProps) => {
  return (
    <div className={classes["filter-item-container"]}>
      <p>{item}</p>
      <button type="button" onClick={() => func({ target: { value: item, checked: false }} as ChangeEvent<HTMLInputElement> )}>
        
        <ImCross />
      </button>
  </div>
  )
};

export default FilterItem;



