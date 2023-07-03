import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(sort: TRENDING, isAdult: false, type: ANIME, format: TV) {
        id
        title {
          romaji
        }
        seasonYear
        averageScore
        coverImage {
          large
          color
        }
      }
    }
  }
`;

export const GET_ANIME_DETAILS = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
      }
      episodes
      description
      averageScore
      genres
      format
      seasonYear
      coverImage {
        extraLarge
        large
      }
    }
  }
`;
