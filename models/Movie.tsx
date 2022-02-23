export class Movie {
  id: string;
  image: string;
  genresList: string[];
  rating: number;
  runtime: number;
  summary: string;
  title: string;
  uploadDate: string;
  year: number;

  constructor(movieResponse: any) {
    this.id = movieResponse.id;
    this.image = movieResponse.background_image;
    this.genresList = movieResponse.genres;
    this.rating = movieResponse.rating;
    this.runtime = movieResponse.runtime;
    this.summary = movieResponse.summary;
    this.title = movieResponse.title;
    this.uploadDate = movieResponse.date_uploaded;
    this.year = movieResponse.year;
  }
}
