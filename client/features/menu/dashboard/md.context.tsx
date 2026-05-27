import { ComityData } from "@/_shared/custom/@types/comity.type";
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

export const MemoComityContext = createContext<{
  comityLoad: ComityData | undefined;
  setComityLoad: Dispatch<SetStateAction<ComityData | undefined>>;
} | null>(null);

export const MemoComityProvider = ({ children }: { children: ReactNode }) => {
  const [comityLoad, setComityLoad] = useState<ComityData | undefined>();

  return (
    <MemoComityContext value={{ comityLoad, setComityLoad }}>
      {children}
    </MemoComityContext>
  );
};

export const useMemoComity = () => {
  const context = useContext(MemoComityContext);
  if (!context) throw new Error("Comity Failed to memoized!");
  return context;
};
