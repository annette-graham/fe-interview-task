type CastMember = {
  id: string;
  name: string;
  credits: string[];
};

export type Film = {
  id: string;
  title: string;
  release_year: number;
  genres: string[];
  cast: CastMember[];
  image_url: string;
  video_url: string;
  review_text?: string;
};
