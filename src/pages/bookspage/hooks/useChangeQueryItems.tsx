import { UseChangeQueryItemsProps } from './hooksInterfaces';


 const useChangeQueryItems = ({queryItems, setQueryItems, refArray}: UseChangeQueryItemsProps) => {

    const changeQueryItems = (e : React.ChangeEvent<HTMLInputElement>) => {
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
            if (refArray.current) {
                const item = refArray.current.find((element) => element.id === value);
                if (item) {
                    item.checked = false;
                }
            } 
        } 
    }

    return {changeQueryItems};
}
    
export default useChangeQueryItems;