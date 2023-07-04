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
  coverImage: { extraLarge?: string; large: string; color?: string };
};

export type MediaAnimeDetail = {
  Media: MediaAnimeList & {
    genres: [string];
    format: string;
    episodes: number;
    description: string;
  };
};

export type AnimeListResponse = {
  Page: {
    pageInfo: PageInfo;
    media: [MediaAnimeList];
  };
};
