export {getMovie, renderInfoMovies};

async function getMovie(id) {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`)
    const json = await res.json()
    return json;
}

function renderInfoMovies(movie) {
    console.log(movie.Title);

    const el = document.querySelector('.infoContent');
    const movie_info = document.createElement('div');
    movie_info.classList.add('movie_info');

    const poster = document.createElement('img');
    const title = document.createElement('h1');
    const released = document.createElement('span');
    const runtime = document.createElement('span');
    const nation = document.createElement('span');
    const plot = document.createElement('div');

    const ratingContent = document.createElement('div');
    const ratingTitle = document.createElement('h3');
    ratingTitle.textContent = 'Ratings';
    ratingContent.append(ratingTitle);

    const actorsContent = document.createElement('div');
    const actorsTitle = document.createElement('h3');
    actorsTitle.textContent = 'Actors';
    const actors = document.createElement('div');
    actorsContent.classList.add('actors_content');
    actorsContent.append(actorsTitle, actors);

    const directorContent = document.createElement('div');
    const directorTitle = document.createElement('h3');
    directorTitle.textContent = 'Director';
    const director = document.createElement('div');
    directorContent.classList.add('director_content');
    directorContent.append(directorTitle, director);


    const genreContent = document.createElement('div');
    const genreTitle = document.createElement('h3');
    genreTitle.textContent = 'Genre';
    const genre = document.createElement('div');
    genreContent.classList.add('genre_content');
    genreContent.append(genreTitle, genre);

    title.textContent = movie.Title;
    title.classList.add('title');
    actors.textContent = movie.Actors;
    director.textContent = movie.Director;
    genre.textContent = movie.Genre;
    released.textContent = movie.Released;
    runtime.textContent = movie.Runtime;
    nation.textContent = movie.nation;
    plot.textContent = movie.Plot;
    plot.classList.add('plot');

    for (let i = 0; i < movie.Ratings.length; i++) {
        const ratingImg = document.createElement('img');
        const ratingText = document.createElement('span')
        const rating = document.createElement('div');
        rating.classList.add(`rating${i}`);
        ratingImg.classList.add(`rating-img${i}`);
        ratingImg.src = `./img/rating${i}.png`;
        ratingText.textContent = movie.Ratings[i].Value;
        rating.append(ratingImg, ratingText);
        ratingContent.appendChild(rating);
    }
    ratingContent.classList.add('rating_content');

    poster.classList.add('poster-img');
    poster.src = movie.Poster;

    movie_info.append(title, released, runtime, nation, plot, ratingContent, actorsContent, directorContent, genreContent);
    el.append(poster, movie_info);
}