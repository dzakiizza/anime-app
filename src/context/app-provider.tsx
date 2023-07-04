import { useLocalStorage } from "@/hooks/useLocalStorage";
import * as React from "react";
import { produce } from "immer";
import randomColor from "@/lib/randomColor";
import { MediaAnimeDetail, MediaAnimeList } from "@/graphql/queries-types";

interface StoreProps {}

interface ProviderProps extends StoreProps {
  children?: React.ReactNode;
}

type ContextType = {
  setState: React.Dispatch<React.SetStateAction<ContextType["state"]>>;
  state: {};
  collectionList: Record<string, any>[] | [];
  action: {
    addCollection: (name: string) => void;
    removeCollection: (name: string) => void;
    addAnime: (
      selectedCollection: (string | number)[],
      data: MediaAnimeList
    ) => void;
  };
  setCollectionList: (value: any) => void;
};

const initialValues: ContextType = {
  setState: () => {},
  state: {},
  collectionList: [],
  action: {
    addCollection: (name) => {},
    removeCollection: (name) => {},
    addAnime: (selectedCollection, data) => {},
  },
  setCollectionList: () => {},
};

const context = React.createContext<ContextType>(initialValues);

export const useAppContext = () => {
  const store = React.useContext(context);
  if (!store) {
    throw new Error("Cannot use `useAppContext` outside of AppProvider");
  }
  return store;
};

const Store = (props: StoreProps) => {
  const [collectionList, setCollectionList] = useLocalStorage(
    "anime-collection",
    []
  );
  const [state, setState] = React.useState<ContextType["state"]>(
    initialValues.state
  );
  const addAnime = (
    selectedCollection: (string | number)[],
    data: MediaAnimeList
  ) => {
    setCollectionList(
      produce(collectionList, (draft: any[]) => {
        selectedCollection.map((selected) => {
          const index = draft.findIndex((item) => item.name === selected);
          const exist = draft[index].animeList.filter(
            (item: any) => item.id === data.id
          );
          if (!exist.length) {
            draft[index].animeList.push({ ...data });
          }
        });
      })
    );
  };
  const addCollection = (name: string) => {
    setCollectionList(
      produce(collectionList, (draft: any[]) => {
        draft.push({ name, color: randomColor(), animeList: [] });
      })
    );
  };
  const removeCollection = (name: string) => {
    setCollectionList(
      produce(collectionList, (draft: any[]) => {
        const index = draft.findIndex((item) => item.name === name);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      })
    );
  };

  return {
    state,
    setState,
    collectionList,
    action: {
      addCollection,
      removeCollection,
      addAnime,
    },
    setCollectionList,
  };
};

export const AppProvider = (props: ProviderProps) => {
  const { children, ...storeData } = props;
  return <context.Provider value={Store(storeData)} {...props} />;
};
