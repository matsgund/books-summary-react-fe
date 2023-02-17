export interface CategoryContextProps {
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
    refArray: React.MutableRefObject<HTMLInputElement[]>;
}
