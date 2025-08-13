import { createContext, Dispatch, SetStateAction } from "react";

type Module = {
  module_id: number;
  module_name: string;
};

type Subject = {
  id: number;
  subject_name: string;
  modules: Module[];
};

export type DataShape = {
  subjects: Subject[];
};

type DataContextType = {
  value: DataShape;
  setValue: Dispatch<SetStateAction<DataShape>>;
};

export const Data_context = createContext<DataContextType | undefined>(
  undefined
);

// type ActiveIndexContextType = {
//   activeIndex: number;
//   setActiveIndex: Dispatch<SetStateAction<number>>;
// };

// export const ActiveIndex_context = createContext<ActiveIndexContextType>({
//   activeIndex: 0,
//   setActiveIndex: () => {},
// });
