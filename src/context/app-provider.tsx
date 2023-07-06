import { MediaAnimeList } from "@/graphql/queries-types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import randomColor from "@/lib/randomColor";
import { produce } from "immer";
import * as React from "react";
import { v4 } from "uuid";

interface StoreProps {}

interface ProviderProps extends StoreProps {
  children?: React.ReactNode;
}

export type CollectionList = {
  id: string;
  name: string;
  color: string;
  animeList: Partial<MediaAnimeList>[];
};

type ContextType = {
  setState: React.Dispatch<React.SetStateAction<ContextType["state"]>>;
  state: {};
  collectionList: CollectionList[];
  action: {
    addCollection: (name: string) => void;
    addBulkAnime: (
      selectedCollection: (string | number)[],
      listData: MediaAnimeList[]
    ) => void;
    removeCollection: (id: string) => void;
    editCollection: (id: string, updatedName: string) => void;
    addAnime: (
      selectedCollection: (string | number)[],
      data: MediaAnimeList
    ) => void;
    removeAnime: (id: number, collectionId: string) => void;
  };
  setCollectionList: (value: any) => void;
};

const initialValues: ContextType = {
  setState: () => {},
  state: {},
  collectionList: [{ id: v4(), name: "", color: "#FFFFFF", animeList: [] }],
  action: {
    addCollection: (name) => {},
    addBulkAnime: (selectedCollection, listData) => {},
    removeCollection: (id) => {},
    editCollection: (id, updatedName) => {},
    addAnime: (selectedCollection, data) => {},
    removeAnime: (id, collectionId) => {},
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
  const addAnime = React.useCallback(
    (selectedCollection: (string | number)[], data: MediaAnimeList) => {
      setCollectionList(
        produce(collectionList, (draft: CollectionList[]) => {
          selectedCollection.map((selected) => {
            const index = draft.findIndex((item) => item.name === selected);
            const exist = draft[index].animeList.filter(
              (item: Partial<MediaAnimeList>) => item.id === data.id
            );
            if (!exist.length) {
              draft[index].animeList.push({ ...data });
            }
          });
        })
      );
    },
    [collectionList]
  );
  const addBulkAnime = React.useCallback(
    (selectedCollection: (string | number)[], listData: MediaAnimeList[]) => {
      setCollectionList(
        produce(collectionList, (draft: CollectionList[]) => {
          listData.map((data) => {
            selectedCollection.map((selected) => {
              const index = draft.findIndex((item) => item.name === selected);
              const exist = draft[index].animeList.filter(
                (item: Partial<MediaAnimeList>) => item.id === data.id
              );
              if (!exist.length) {
                draft[index].animeList.push({ ...data });
              }
            });
          });
        })
      );
    },
    [collectionList]
  );
  const addCollection = React.useCallback(
    (name: string) => {
      const collectionId = v4();
      setCollectionList(
        produce(collectionList, (draft: CollectionList[]) => {
          draft.push({
            id: collectionId,
            name,
            color: randomColor(),
            animeList: [],
          });
        })
      );
    },
    [collectionList]
  );
  const removeCollection = React.useCallback(
    (id: string) => {
      setCollectionList(
        produce(collectionList, (draft: CollectionList[]) => {
          const index = draft.findIndex((item) => item.id === id);
          console.log(id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        })
      );
    },
    [collectionList]
  );
  const editCollection = React.useCallback(
    (id: string, updatedName: string) => {
      setCollectionList(
        produce(collectionList, (draft: CollectionList[]) => {
          const index = draft.findIndex((item) => item.id === id);
          if (index !== -1) {
            draft[index].name = updatedName;
          }
        })
      );
    },
    [collectionList]
  );
  const removeAnime = React.useCallback(
    (id: number, collectionId: string) => {
      setCollectionList(
        produce(collectionList, (draft: CollectionList[]) => {
          const index = draft.findIndex((item) => item.id === collectionId);
          if (index !== -1) {
            const animeIndex = draft[index].animeList.findIndex(
              (item: Partial<MediaAnimeList>) => item.id === id
            );
            if (animeIndex !== -1) {
              draft[index].animeList.splice(animeIndex, 1);
            }
          }
        })
      );
    },
    [collectionList]
  );

  return {
    state,
    setState,
    collectionList,
    action: {
      addCollection,
      addBulkAnime,
      removeCollection,
      editCollection,
      addAnime,
      removeAnime,
    },
    setCollectionList,
  };
};

export const AppProvider = (props: ProviderProps) => {
  const { children, ...storeData } = props;
  return <context.Provider value={Store(storeData)} {...props} />;
};
