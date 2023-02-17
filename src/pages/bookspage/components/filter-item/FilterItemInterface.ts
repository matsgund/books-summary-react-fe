import { ChangeEvent } from "react";

export interface FilterItemProps {
    item: string;
    func: (event: ChangeEvent<HTMLInputElement>) => void;
}
  