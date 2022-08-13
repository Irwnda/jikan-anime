export enum enumAnimeType {
  tv = 'TV',
  ova = 'OVA',
  ona = 'ONA',
  special = 'SPECIAL',
  music = 'MUSIC',
}

export enum enumAnimeStatus {
  airing = 'Currently Airing',
  complete = 'Finished Airing',
  upcoming = 'Upcoming',
}

export enum enumAnimeRating {
  g = 'G - All Ages',
  pg = 'PG - Children',
  pg13 = 'PG-13 - Teens 13 or older',
  r17 = 'R - 17+ (violence & profanity)',
  r = 'R - Mild Nudity',
}

enum animeSeason {
  winter = 'winter',
  spring = 'spring',
  summer = 'summer',
  fall = 'fall',
}

export type animeData = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };

  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };

  approved: boolean;
  titles: string[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: enumAnimeType;
  source: string;
  episodes: number;
  status: enumAnimeStatus;
  airing: true;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
      string: string;
    };
  };
  duration: string;
  rating: enumAnimeRating;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: animeSeason;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  licensors: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  studios: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  genres: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  explicit_genres: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  themes: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
  demographics: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
};
