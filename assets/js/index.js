const cover = document.getElementById("cover");
const rating = document.getElementById("rating");
const favs = document.getElementById("favs");
const eps = document.getElementById("eps");
const trailer = document.getElementById("trailer");

const title = document.getElementById("title");
const desc = document.getElementById("desc");

const btn = document.getElementById("button");

const loader = document.getElementById("loader");
const card = document.getElementById("card");

window.onload = () => {
  randomAnime.fetchAnime();
};

const loaderStart = () => {
  loader.style.display = "block";
  card.style.display = "none";
};

const loaderEnd = () => {
  loader.style.display = "none";
  card.style.display = "block";
};

let randomAnime = {
  fetchAnime: function () {
    loaderStart();
    fetch(
      "https://kitsu.io/api/edge/anime/" + Math.floor(Math.random() * 50) + 1
    )
      .then((response) => response.json())
      .then((data) => this.displayRandomAnime(data));
  },

  displayRandomAnime: function (data) {
    const { en_jp, ja_jp } = data.data.attributes.titles;
    const {
      description,
      averageRating,
      favoritesCount,
      youtubeVideoId,
      episodeCount,
    } = data.data.attributes;
    const { medium, original } = data.data.attributes.posterImage;
    loaderEnd();
    cover.src = medium;

    title.innerText = en_jp + " / " + ja_jp;
    desc.innerText = description;

    rating.innerHTML =
      "<strong>Rating: </strong>" + Math.floor(averageRating / 10) + "/10";
    favs.innerHTML = "<strong>Favorites: </strong>" + favoritesCount;
    eps.innerHTML = "<strong>Episodes: </strong>" + episodeCount;
    trailer.innerHTML =
      "<strong>Trailer: </strong>" +
      "<a href='https://www.youtube.com/watch?v=" +
      youtubeVideoId +
      "'" +
      "target='_blank'" +
      ">" +
      "Watch now!" +
      "</a>";
    bg.style.backgroundImage = "url(" + original + ")";
  },
};

btn.addEventListener("click", () => {
  randomAnime.fetchAnime();
});
