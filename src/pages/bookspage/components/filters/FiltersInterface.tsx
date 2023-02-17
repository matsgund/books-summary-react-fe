
export interface FilterContextProps {
    queryItems: {
        items: string[];
    };
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearQueryItems: () => void;
}
