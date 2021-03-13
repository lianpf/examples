export interface Movie {
  id: string;
  title: string;
  summary: string;
  author: string;
  poster: string;
  cover: string;
  duration: string;
  pubDate: string;
  rate: string;
  isPlay: "0" | "1";
  video: string;
  viewCount: number;
  casts: Performer[];
  movieType: Category[];
}

// 电影类别
export interface Category {
  id: number;
  name: string;
}

// 用户信息
export interface Performer {
  avatar: string;
  name: string;
}

export interface ListByStatusData {
  page: number;
  pageSize: number;
}
export interface MovieItem {
  id: string;
  name: string;
  desc: string;
}