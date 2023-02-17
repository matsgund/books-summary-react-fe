export interface QueryItems {
    items: string[];
}

export interface CategoryContextProps {
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    refArray: React.MutableRefObject<HTMLInputElement[]>;
}

export interface SearchContextProps {
    setQuerySearch: React.Dispatch<React.SetStateAction<string>>;
    setQueryFilter: React.Dispatch<React.SetStateAction<string>>;
    queryFilter: string;
}

export interface FilterContextProps {
    queryItems: {
        items: string[];
    },
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearQueryItems: () => void;
}

export interface BooksContextProps {
    queryItems: {
        items: string[];
    };
    querySearch: string;
}
