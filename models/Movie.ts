export class Movie {
  id: number;
  large_cover_image: string;
  genres: string[];
  rating: number;
  runtime: number;
  synopsis: string;
  title: string;
  date_uploaded: string;
  year: number;

  constructor(movieResponse: any) {
    this.id = movieResponse.id;
    this.large_cover_image = movieResponse.large_cover_image;
    this.genres = movieResponse.genres;
    this.rating = movieResponse.rating;
    this.runtime = movieResponse.runtime;
    this.synopsis = movieResponse.synopsis;
    this.title = movieResponse.title;
    this.date_uploaded = movieResponse.date_uploaded;
    this.year = movieResponse.year;
  }
}
