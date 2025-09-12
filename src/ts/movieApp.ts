import { IMovie } from "./models/Movie";
import { getData } from "./services/movieService";
import { movieSort } from "./functions";

let movies: IMovie[] = [];
let desc = true;

export const init = () => {
  const form = document.getElementById("searchForm") as HTMLFormElement;
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  });

  const sortBtn = document.getElementById("sortBtn") as HTMLButtonElement;
  sortBtn.addEventListener("click", () => {
    handleSort();
  });
};

export async function handleSubmit() {
  const searchText = (document.getElementById("searchText") as HTMLInputElement)
    .value;

  const container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  container.innerHTML = "";

  try {
    movies = await getData(searchText);

    if (movies.length > 0) {
      createHtml(movies, container);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
}

export const handleSort = () => {
  const container = document.getElementById("movie-container") as HTMLDivElement;
  container.innerHTML = "";

  movies = movieSort(movies, desc);
  desc = !desc;

  createHtml(movies, container);
};

export const createHtml = (movies: IMovie[], container: HTMLDivElement) => {
  for (let i = 0; i < movies.length; i++) {
    const movie = document.createElement("div");
    const title = document.createElement("h3");
    const img = document.createElement("img");

    movie.classList.add("movie");
    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    movie.appendChild(title);
    movie.appendChild(img);

    container.appendChild(movie);
  }
};

export const displayNoResult = (container: HTMLDivElement) => {
  let noMessage = document.createElement("p");

  noMessage.innerHTML = "Inga sökresultat att visa";

  container.appendChild(noMessage);
};
