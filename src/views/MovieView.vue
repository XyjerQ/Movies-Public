<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import DisplayMovies from '../components/DisplayMovies.vue'
import Genres from '../components/Genres.vue'
import * as apikey from '../API/apikey'


const moviesData = reactive([]);
const genreData = reactive([]);
const genreSel = ref([])
const page = ref(1);
const sort_by = ref('desc');
const scrollComponent = ref(null)
const loadMovies = ref(false)

const load = () => {
      loadMovies.value = true
    } 

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', apikey.options)
  .then(response => response.json())
  .then(response => {
    // console.log(response.genres)

    for(let i = 0; i < response.genres.length; i++) {
        genreData.push({
          id: response.genres[i].id,
          name: response.genres[i].name

        })  
    }
    // console.log(genreData)
  })
  .catch(err => console.error(err));

const getMovies = () => {
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page.value}&sort_by=popularity.${sort_by.value}&with_genres=${genreSel.value}`, apikey.options)
  .then(response => response.json())
  .then(response => {
    // console.log(response.results)
   
    // moviesData.push(response.results)
    for(let i = 0; i < response.results.length; i++) {
        moviesData.push({
          id: response.results[i].id,
          title: response.results[i].title,
          overview: response.results[i]. overview,
          release_date: response.results[i].release_date,
          poster: response.results[i].poster_path

        })  
    }
    setTimeout(load, 750)
   
    // console.log(moviesData)
    // console.log(sort_by.value)
    // console.log(genreSel.value)
  })
  .catch(err => console.error(err));
}
getMovies();

const asc = () => {
  sort_by.value = 'asc'
  moviesData.splice(0)
  page.value = 1
  loadMovies.value = false;
  getMovies();
}

const desc = () => {
  sort_by.value = 'desc'
  moviesData.splice(0)
  page.value = 1
  loadMovies.value = false;
  getMovies();
}

const genreComp = (value) => {
  loadMovies.value = false;
  // console.log(value)
  // console.log(genreSel)
  if(genreSel.value.includes(value)) {
    genreSel.value.splice(genreSel.value.indexOf(value), 1);
  } else {
    genreSel.value.push(value)
  }
  
  moviesData.splice(0)
  page.value = 1
  getMovies();
}

const loadMore = () => {
    page.value += 1
    getMovies();
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})
onUnmounted(() => {
  window.addEventListener("scroll", handleScroll)
})

const handleScroll = (e) => {
    let element = scrollComponent.value
    if(element.getBoundingClientRect().bottom < window.innerHeight) {
        loadMore()
    }
}

</script>

<template>
    <div class="bg-dark text-light border-top border-light d-flex">
      <div class="row gx-0">
        <div class="col m-1">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Sort by:
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <button type="button" class="btn btn-light" @click="asc()">Ascendig</button><br>
                  <button type="button" class="btn btn-light" @click="desc()">Descending</button>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  Genres:
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <Genres v-for="genreOutput in genreData"
                  :key="genreOutput.id"
                  :id="genreOutput.id"
                  :name="genreOutput.name"
                  @genreComp="genreComp"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="row d-flex justify-content-center " v-if="loadMovies != true">
            <div class="card m-1 gx-0 placeholder-glow" style="width: 16rem;" v-for="n in 10">
            <span style="height: 381px;" class="card-img-top placeholder"></span>
            <div style="height: 112px;" class="card-body">
                <h5 class="card-title">
                  <span class="placeholder rounded col-6"></span>
                </h5>
                <p class="card-text">
                  <span class="placeholder rounded col-4"></span>
                </p>
            </div>
            </div>  
          </div>

          <div class="row d-flex justify-content-center " ref="scrollComponent" v-else>
          <DisplayMovies v-for="movieOutput in moviesData"
          :key="movieOutput.id"
          :id="movieOutput.id"
          :title="movieOutput.title"
          :overview="movieOutput.overview"
          :release_date="movieOutput.release_date" 
          :poster="movieOutput.poster" />
          </div>
          <div class="container-fluid d-flex justify-content-center text-dark">
                .
            <!-- Without it doesn't work idk why -->
          </div>
        </div>
        <div class="col">
          
        </div>
      </div>

    </div>
    
</template>

<style scoped>
     .tile {
        border: 2px rgb(58, 58, 58) solid;
        float: left;
        padding: 5px;
        margin: 5px;
    }
    .card:hover {
        background-color: darkgray;
    }
</style>