export interface CategoryItemProps {
    item: {
        title: string;
        slug: {
            current: string;
        };
        bookCount: number;
    };
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    i: number;
    refArray:
         React.MutableRefObject<HTMLInputElement[]>;
    queryItems: string[];     
}
