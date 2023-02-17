import { useChangeQueryItemsProps } from './hooksInterfaces';


 const useChangeQueryItems = ({setQueryItems, refArray}: useChangeQueryItemsProps) => {

    const clearQueryItems = () => {
        setQueryItems({
            items: [],
        })
        
        // set all checkboxes to false
        refArray.current.forEach(element => {
            element.checked = false;
        });

    }

    return {clearQueryItems};
}
 
export default useChangeQueryItems;