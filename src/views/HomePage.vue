<script setup>
import { reactive, ref } from 'vue';
import Recomend from '../components/Recomend.vue'
import * as apikey from '../API/apikey'

const fetchTrending = reactive([])
const fetchMovies = reactive([])
const fetchTv = reactive([])
const query = ref('')
const trend = ref('day')
const movSel = ref('now_playing')
const tvSel = ref('on_the_air')
const loadTrending = ref(false)
const loadMovies = ref(false)
const loadTv = ref(false)


let i = 0

const loadT = () => {
      loadTrending.value = true
    } 

const loadM = () => {
      loadMovies.value = true
    } 
    
const loadV = () => {
      loadTv.value = true
    } 

const search = () => {
    if(query.value != '') {
        window.location.href = `/search/${query.value}`;
    }
}

const trending = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/${trend.value}`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        fetchTrending.length = 0
        for(i = 0; i < response.results.length; i++) {
            if(response.results[i].media_type == 'movie') {
               fetchTrending.push({
                id: response.results[i].id,
                title: response.results[i].title,
                poster: response.results[i].poster_path,
                type: response.results[i].media_type,

                }) 
            } else {
                fetchTrending.push({
                id: response.results[i].id,
                title: response.results[i].name,
                poster: response.results[i].poster_path,
                type: response.results[i].media_type,

                }) 
            }
            
        }

        setTimeout(loadT, 750)
    })
    .catch(err => console.error(err));
}
trending();

const movies = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movSel.value}`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        fetchMovies.length = 0
        for(i = 0; i < response.results.length; i++) {
            fetchMovies.push({
                id: response.results[i].id,
                title: response.results[i].title,
                poster: response.results[i].poster_path,
                type: 'movie'

            })
        }
        setTimeout(loadM, 750)
    })
    .catch(err => console.error(err));
}
movies()

const tv = () => {
    fetch(`https://api.themoviedb.org/3/tv/${tvSel.value}`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        fetchTv.length = 0
        for(i = 0; i < response.results.length; i++) {
            fetchTv.push({
                id: response.results[i].id,
                title: response.results[i].name,
                poster: response.results[i].poster_path,
                type: 'tv'

            })
        }
        setTimeout(loadV, 750)
    })
    .catch(err => console.error(err));
}
tv()
  

  const trendValue = (value) => {
    switch (value) {
        case 'day':
            if(trend.value != value) {
                trend.value = value
                loadTrending.value = false
                trending()
            }
            break;
        
        case 'week':
            if(trend.value != value) {
                trend.value = value
                loadTrending.value = false
                trending()
            }
            break;
    }
  }

  const movieValue = (value) => {
    switch (value) {
        case 'popular':
            if(movSel.value != value) {
                movSel.value = value
                loadMovies.value = false
                movies()
            }
            break;
        
        case 'upcoming':
            if(movSel.value != value) {
                movSel.value = value
                loadMovies.value = false
                movies()
            }
            break;
        
        case 'top_rated':
            if(movSel.value != value) {
                movSel.value = value
                loadMovies.value = false
                movies()
            }
            break;

        case 'now_playing':
            if(movSel.value != value) {
                movSel.value = value
                loadMovies.value = false
                movies()
            }
            break;
    }
  }

  const tvValue = (value) => {
    switch (value) {
        case 'popular':
            if(tvSel.value != value) {
                tvSel.value = value
                loadTv.value = false
                tv()
            }
            break;
        
        case 'on_the_air':
            if(tvSel.value != value) {
                tvSel.value = value
                loadTv.value = false
                tv()
            }
            break;
        
        case 'top_rated':
            if(tvSel.value != value) {
                tvSel.value = value
                loadTv.value = false
                tv()
            }
            break;
    }
  }
</script>

<template>
    <div class="bg-dark text-light border-top border-light d-flex">
      <div class="row w-100">
        <div class="col m-1">
        
        </div>
        <div class="col-9">
            <div class="border border-secondary rounded p-3 mt-4" style="height: 300px;">
            <div class="row d-flex justify-content-center mt-2">
                <div class="my-4">
                    <h1>Welcome to MoViews!</h1>
                    <h3>Millions of movies, TV series and people to discover. Explore now.</h3>
                </div>
                <div class="input-group input-group-secondary mb-3 mt-4">
                    <input type="text" class="form-control" placeholder="Search Movies, Tv Series and People!" aria-describedby="button-addon2" v-model="query" @keypress.enter="search()">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="search()">Search</button>
                </div>
            </div>
            </div>
            <div class="m-4">
                <h3>Trending:
                    <input type="radio" class="btn-check" name="Trending" id="trendToday" autocomplete="off" checked>
                    <label class="btn btn-secondary me-1" for="trendToday" @click="trendValue('day')">Day</label>
                    
                    <input type="radio" class="btn-check" name="Trending" id="trendWeek" autocomplete="off" >
                    <label class="btn btn-secondary" for="trendWeek" @click="trendValue('week')">Week</label>
                </h3>
                <div class="scrolling-wrapper" v-if="loadTrending != true">
                    <div class="card m-1 placeholder-glow" style="width: 10rem;" v-for="n in 10">
                    <span class="card-img-top placeholder" style="height: 237px;"></span>
                    <div class="card-body">
                        <p class="card-title">
                            <span class="placeholder rounded col-8"></span>
                        </p>
                    </div>
                    </div>
                </div>
                <div class="scrolling-wrapper" v-else>
                    <Recomend v-for="trending in fetchTrending"
                    :key="trending.id"
                    :id="trending.id"
                    :poster="trending.poster"
                    :type="trending.type"
                    :title="trending.title"/>
                </div>
            </div>
            <div class="m-4">
                <h3>Movies:
                    <input type="radio" class="btn-check" name="Movies" id="nowPlaying" autocomplete="off" checked>
                    <label class="btn btn-secondary me-1" for="nowPlaying" @click="movieValue('now_playing')">Now Playing</label>
                    
                    <input type="radio" class="btn-check" name="Movies" id="popular" autocomplete="off" >
                    <label class="btn btn-secondary me-1" for="popular" @click="movieValue('popular')">Popular</label>

                    <input type="radio" class="btn-check" name="Movies" id="topRated" autocomplete="off">
                    <label class="btn btn-secondary me-1" for="topRated" @click="movieValue('top_rated')">Top Rated</label>
                    
                    <input type="radio" class="btn-check" name="Movies" id="upcoming" autocomplete="off" >
                    <label class="btn btn-secondary" for="upcoming" @click="movieValue('upcoming')">Upcoming</label>
                </h3>
                <div class="scrolling-wrapper" v-if="loadMovies != true">
                    <div class="card m-1 placeholder-glow" style="width: 10rem;" v-for="n in 10">
                    <span class="card-img-top placeholder" style="height: 237px;"></span>
                    <div class="card-body">
                        <p class="card-title">
                            <span class="placeholder rounded col-8"></span>
                        </p>
                    </div>
                    </div>
                </div>
                <div class="scrolling-wrapper" v-else>
                    <Recomend v-for="movies in fetchMovies"
                    :key="movies.id"
                    :id="movies.id"
                    :poster="movies.poster"
                    :type="movies.type"
                    :title="movies.title"/>
                </div>
            </div>
            <div class="m-4">
                <h3>Tv:
                    <input type="radio" class="btn-check" name="Tv" id="onTheAir" autocomplete="off" >
                    <label class="btn btn-secondary me-1" for="onTheAir" @click="tvValue('on_the_air')">On The Air</label>

                    <input type="radio" class="btn-check" name="Tv" id="tvPopular" autocomplete="off">
                    <label class="btn btn-secondary me-1" for="tvPopular" @click="tvValue('popular')">Popular</label>
                    
                    <input type="radio" class="btn-check" name="Tv" id="tvTopRated" autocomplete="off" >
                    <label class="btn btn-secondary" for="tvTopRated" @click="tvValue('top_rated')">Top Rated</label>
                </h3>
                <div class="scrolling-wrapper" v-if="loadTv != true">
                    <div class="card m-1 placeholder-glow" style="width: 10rem;" v-for="n in 10">
                    <span class="card-img-top placeholder" style="height: 237px;"></span>
                    <div class="card-body">
                        <p class="card-title">
                            <span class="placeholder rounded col-8"></span>
                        </p>
                    </div>
                    </div>
                </div>
                <div class="scrolling-wrapper" v-else>
                    <Recomend v-for="tv in fetchTv"
                    :key="tv.id"
                    :id="tv.id"
                    :poster="tv.poster"
                    :type="tv.type"
                    :title="tv.title"/>
                </div>
            </div>
        </div>
        <div class="col">
          
        </div>
      </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .scrolling-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    .card {
        display: inline-block;
    }
    }
</style>