import { getMovie, renderInfoMovies } from './infoPage.js';

;(async () => {
    const moviesEl = document.querySelector('.movies');
    const moreBtnEl = document.querySelector('.more_btn');

    moreBtnEl.classList.add('remove');

    let page = 1;
    let maxPage = -1;

    const movie_value = document.querySelector('.movie_input');
    const searchBtn = document.querySelector('.search_btn');
    const movieOption = document.getElementById('movie_option');
    const countOption = document.getElementById('count_option');
    const yearOption = document.getElementById('year_option');

    for (let y = 2022; y >= 1985; y -= 1) {
        let movieYear = document.createElement('option');
        movieYear.textContent = y;
        movieYear.value = y;
        yearOption.append(movieYear);
    }

    function removeMovie() {
        let removeDiv = document.getElementById('remove_movie');
        while (removeDiv.hasChildNodes()) {
            removeDiv.removeChild(removeDiv.firstChild);
        }
        page = 1;
    }

    searchBtn.addEventListener('click', async () => {
        removeMovie();
        let title = movie_value.value;
        let type = movieOption.value;
        let year = yearOption.value;
        for (let i = 0; i <= countOption.value; i++) {
            getMovies(page, title, type, year);
            page += 1;
        }
        moreBtnEl.classList.remove('remove');
        moreBtnEl.addEventListener('click', async () => {
            title = movie_value.value;
            type = movieOption.value;
            year = yearOption.value;
            page += 1;
            getMovies(page, title, type, year);
        })
    })


    async function getMovies(page = 1, title, type, year) {
        const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${year}`);
        const json = await res.json();
        if (json.Response === 'True') {
            const {
                Search: movies,
                totalResults
            } = json;
            maxPage = Math.ceil(Number(totalResults) / 10);
            if (page >= maxPage) {
                moreBtnEl.classList.add('remove');
            }
            return renderMovies(movies);
        } else {
            errorMovie(json.Error);
        }
    }

    function errorMovie(error) {
        const errorText = document.createElement('h3');
        errorText.classList.add('error__text');
        errorText.textContent = error;
        moviesEl.append(errorText);
    }


    function renderMovies(movies) {
        for (const movie of movies) {
            const el = document.createElement('div');
            el.classList.add('movie');

            const titleEl = document.createElement('h1');
            titleEl.classList.add('title');
            titleEl.textContent = movie.Title;

            const imgEl = document.createElement('img');
            imgEl.src = movie.Poster;
            imgEl.onerror = function (err) {
                err.target.src = "./img/img-error.png";
            }

            const yearEl = document.createElement('h3');
            const valueEl = document.createElement('h3');
            const infoBtn = document.createElement('a');
            const movieID = movie.imdbID;
            let count = 0;

            const backEl = document.createElement('div');
            el.appendChild(backEl);

            el.addEventListener('click', async () => {
                if (count === 0) {
                    backEl.classList.add('movie_cover');
                    const dMovie = await getMovie(movieID);

                    backEl.appendChild(titleEl);
                    titleEl.classList.remove('title');
                    titleEl.classList.add('cover_title');

                    yearEl.textContent = movie.Year;
                    yearEl.classList.add('year');


                    infoBtn.classList.add('info_btn');
                    infoBtn.textContent = 'About..';
                    infoBtn.href = `/#${movieID}`;

                    const removeMain = document.querySelector('.searchpage');

                    infoBtn.addEventListener('click', () => {
                        setTimeout(() => {
                            window.scrollTo(0, document.body.scrollHeight)
                        }, 100)
                        removeMain.classList.add('search__remove');
                        renderInfoMovies(dMovie);
                    })

                    backEl.append(yearEl, valueEl, infoBtn);
                    count = 1;

                } else {
                    titleEl.classList.add('title');
                    titleEl.classList.remove('cover_title');
                    el.appendChild(titleEl);

                    while (backEl.hasChildNodes()) {
                        backEl.removeChild(backEl.firstChild);
                    }
                    backEl.classList.remove('movie_cover');
                    count = 0;
                }
            })
            el.append(titleEl, imgEl);
            moviesEl.append(el);
        }
    }
})()