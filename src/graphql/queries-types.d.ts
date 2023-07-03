export type PageInfo = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: number;
};

export type MediaAnimeList = {
  id: number;
  title: { romaji: string };
  averageScore: number;
  seasonYear: string;
  coverImage: { large: string; color: string };
};

export type AnimeListResponse = {
  Page: {
    pageInfo: PageInfo;
    media: [MediaAnimeList];
  };
};
