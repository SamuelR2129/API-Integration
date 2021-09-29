
//root call with try and catch for errors
async function getCountries(s, p) {
    try {
        const countryData = await getCountriesData(s);
        const minimumCountries = getCountriesAbovePop(countryData, p);
        console.log(minimumCountries);
    } catch (err) {
        console.error(err);
    }
}


//makes a get request to the api, bytes to string and categorieses it, 
//utilises a promise to make sure we have all the data
function getAPI (url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = ""
            res.on("data", (unParseData) => {
                data = data + unParseData;
            });
            
            res.on("end", () => {
                response = JSON.parse(data)
                resolve(response);
            });

            res.on("error", (err) => {
                reject(err);
            });
        });
    }); 
}


//creates the full url string, calls the api, and creates a array of objects
async function getCountriesData (subString){
    let url = "https://jsonmock.hackerrank.com/api/countries/search?name=" + subString + "&page=";
    let pageNum = 1;
    let countryData = [];
     
    while (true) {
    
        let completeUrl = url + pageNum;

        const response = await getAPI(completeUrl);

        countryData = countryData.concat(response.data);
       
        if (pageNum >= response.total_pages) {
            break;
        }
        
        pageNum++;
    }
    return countryData; // Promise
}

//compares the country pop with the minimum pop for all the objects then returns the final value
function getCountriesAbovePop (countries, minPop) {
    return countries.reduce((numCountriesAbovePop, country) => {
        if (country.population > minPop) {
            return numCountriesAbovePop + 1;
        }
        else {
            return numCountriesAbovePop;
        }
    }, 0)
}

const https = require('https');

     /*
     * Complete the function below. 
     * Base url: https://jsonmock.hackerrank.com/api/movies/search/?Title=
     */

     async function getMovieTitles(substr) {
try {
        const movieData = await getMovieData(substr);
        const listMovies = orderMovies(movieData);
        listMovies.forEach(movie => console.log(movie));    
    } catch (err) {
        console.error(err);
    }          
    }
    //makes a get request to the api, bytes to string and categorieses it, 
    //utilises a promise to make sure we have all the data
    function getAPI (url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = ""
            res.on("data", (unParseData) => {
                data = data + unParseData;
            });
            res.on("end", () => {
                response = JSON.parse(data);
                resolve(response);
            });

            res.on("error", (err) => {
                reject(err);
            });
        });
    }); 
}

    //creates the full url string, calls the api, and creates a array of objects
    async function getMovieData (subString){
    let url = "https://jsonmock.hackerrank.com/api/movies/search/?Title=" + subString + "&page=";
    let pageNum = 1;
    let movieData = [];
     
    while (true) {
    
        let completeUrl = url + pageNum;

        const response = await getAPI(completeUrl);

        movieData = movieData.concat(response.data);
       
        if (pageNum >= response.total_pages) {
            break;
        }
        
        pageNum++;
    }
    return movieData; 
}

function orderMovies (movieData) {
    let titles = movieData.map(movie => {
        return movie.Title ;
    }).sort();
}


