// import React, { useState, useRef, createContext, useContext } from 'react';
// import useBooks from './hooks/useBooks';


// interface ChangeQueryItemsProps {
//     target: {
//         value: string;
//         checked: boolean;
//     },
// }


// interface ChangeQueryItemsProps {
//     target: {
//       value: string;
//       checked: boolean;
//     },
//   }

//   interface QueryItems {
//     items: string[];
//   }

// const refArray = useRef<HTMLInputElement[]>([]);
// const [querySearch, setQuerySearch] = useState("");
// const [queryFilter, setQueryFilter] = useState("");
// const [queryItems, setQueryItems] = useState<QueryItems>({items:[]});
// const {books, booksError} = useBooks({queryItems, querySearch});


// // function that empties the queryItems array and sets search querySearch to empty string.
// const clearQueryItems = () => {
//     setQueryItems({
//         items: [],
//     })
    
//     // set all checkboxes to false
//     refArray.current.forEach(element => {
//         element.checked = false;
//     });

// }

// // function that handles the submit of the search form
// const handleSubmit = (e) => {
//     e.preventDefault();
//     setQuerySearch(e.target.elements.search.value);
// }


// const changeQueryItems = (e : ChangeQueryItemsProps) : void => {
//     const {value, checked} = e.target;
//     const {items} = queryItems;
    
//     // add queryElement
//     if(checked) {
//         setQueryItems({
//             items: [...items, value],
//         })
//     } 
//     // remove queryElement
//     else {
//         setQueryItems({
//             items: items.filter((e) => e !==value),               
//         })
//         // checkbox is set to false when removed from queryItems array
//         if (refArray.current) {
//             const item = refArray.current.find((element) => element.id === value);
//             if (item) {
//                 item.checked = false;
//             }
//         }
//     } 
// }




// // context for the changeQueryItems function

// interface changeQueryItemsContextProps {
//     changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     refArray: React.MutableRefObject<HTMLInputElement[]>;

// }

// interface children {
//     children: React.ReactNode;
// }

// export const changeQueryItemsContext = createContext<changeQueryItemsContextProps | null>(null);

// export function useChangeQueryItemsContext() {
//    return useContext(changeQueryItemsContext);
// }

// export const changeQueryItemsContextProvider = ({children}: children) => {

//     return (
//         <changeQueryItemsContext.Provider value={{changeQueryItems, refArray}}>
//             {children}
//         </changeQueryItemsContext.Provider>
//     )
// }