import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// Open Context

const IsOpenContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const IsOpenContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenContext.Provider>
  );
};

export const useOpenContext = () => {
  const context = useContext(IsOpenContext);
  if (!context) throw new Error("Failed load the context!");
  return context;
};

export const isLoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const IsLoadingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <isLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </isLoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(isLoadingContext);
  if (!context) {
    throw new Error(`Failed load the context!`);
  }
  return context;
};
