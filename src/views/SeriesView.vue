<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import DisplaySeries from '../components/DisplaySeries.vue';
import Genres from '../components/Genres.vue'
import * as apikey from '../API/apikey'


const fetchSeries = reactive([])
const genreData = reactive([])
const genreSel = ref([])
const page = ref(1)
const sort_by = ref('desc')
const scrollComponent = ref(null)
const loadSeries = ref(false)

let i = null 

const load = () => {
      loadSeries.value = true
    } 



fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', apikey.options)
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

const getSeries = () => {
    fetch(`https://api.themoviedb.org/3/discover/tv?page=${page.value}&sort_by=popularity.${sort_by.value}&with_genres=${genreSel.value}`, apikey.options)
    .then(response => response.json())
    .then(response => {
        for(i=0;i < response.results.length; i++) {
            fetchSeries.push({
                id: response.results[i].id,
                name: response.results[i].name,
                release_date: response.results[i].first_air_date,
                poster: response.results[i].poster_path,
            })
        }

        setTimeout(load, 750)
    })
    .catch(err => console.error(err));
}
getSeries();

const loadMore = () => {
    page.value += 1
    getSeries();
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

const genreComp = (value) => {
  loadSeries.value = !loadSeries.value
  // console.log(value)
  // console.log(genreSel)
  if(genreSel.value.includes(value)) {
    genreSel.value.splice(genreSel.value.indexOf(value), 1);
  } else {
    genreSel.value.push(value)
  }
  
  fetchSeries.splice(0)
  page.value = 1
  getSeries();
}

const asc = () => {
  sort_by.value = 'asc'
  fetchSeries.splice(0)
  page.value = 1
  loadSeries.value = !loadSeries.value
  getSeries();
}

const desc = () => {
  sort_by.value = 'desc'
  fetchSeries.splice(0)
  page.value = 1
  loadSeries.value = !loadSeries.value
  getSeries();
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
          <div class="row d-flex justify-content-center " v-if="loadSeries != true">
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
            <DisplaySeries v-for="series in fetchSeries"
            :key="series.id"
            :id="series.id"
            :name="series.name"
            :poster="series.poster"
            :release_date="series.release_date"
            />
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

<style lang="scss" scoped>
    
</style>