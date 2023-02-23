import Book from '@/interfaces/bookInterface';


export interface BooksResult {
    books: Book[];
    booksError: string;
}

export interface QueryItemsProps {
    queryItems: {
        items: string[];
    },
    querySearch: string;
    latestBookId: string;
}
 
export interface ChangeQueryItemsProps {
    target: {
      value: string;
      checked: boolean;
    },
  }

export interface QueryItems {
    items: string[];
}

export interface ChangeQueryItemsContextProps {
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    refArray:  React.MutableRefObject<HTMLInputElement[]>;
}

export interface UseChangeQueryItemsProps {
    queryItems: QueryItems;
    setQueryItems: React.Dispatch<React.SetStateAction<QueryItems>>;
    refArray:  React.MutableRefObject<HTMLInputElement[]>;
}

export interface useChangeQueryItemsProps {
    setQueryItems: React.Dispatch<React.SetStateAction<QueryItems>>;
    refArray:  React.MutableRefObject<HTMLInputElement[]>;
}


