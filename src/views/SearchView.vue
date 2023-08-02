<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import DisplaySearch from '../components/DisplaySearch.vue'
import * as apikey from '../API/apikey'

const props = defineProps({
        query: {
            type: String,
        },
        
    });

const fetchSearch = reactive([])
const scrollComponent = ref(null)
const loadSearch = ref(false)
const page = ref(1)

let i = 0

const load = () => {
      loadSearch.value = true
    } 

const getSearch = () => {
    fetch(`https://api.themoviedb.org/3/search/multi?query=${props.query}&page=${page.value}`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        for(i = 0; i < response.results.length; i++) {
            if(response.results[i].media_type == 'movie') {
                fetchSearch.push({
                    id: response.results[i].id,
                    type: response.results[i].media_type,
                    title: response.results[i].title,
                    poster: response.results[i].poster_path,
                    overview: response.results[i].overview
                })
            } else if(response.results[i].media_type == 'tv') {
                fetchSearch.push({
                    id: response.results[i].id,
                    type: response.results[i].media_type,
                    title: response.results[i].name,
                    poster: response.results[i].poster_path,
                    overview: response.results[i].overview
                })
            } else if(response.results[i].media_type == 'person') {
                fetchSearch.push({
                    id: response.results[i].id,
                    type: response.results[i].media_type,
                    title: response.results[i].name,
                    poster: response.results[i].profile_path,
                    overview: response.results[i].known_for_department
                })
            }
        } 
    
        setTimeout(load, 750)
    })
    .catch(err => console.error(err));
        
}
getSearch();

const loadMore = () => {
    page.value += 1
    getSearch();
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
    <div class="text-light border-top border-light">
        <div class="row gx-0" ref="scrollComponent">
            <div class="col">
                
            </div>
            <div class="col-6 " v-if="loadSearch != true">
                <div class="card m-3 placeholder-glow" style="max-width: 1000px;" v-for="n in 6">
                <div class="row g-0">
                    <div class="col-md-2">
                        <span class="card-img-top placeholder" style="height: 198px;"></span>
                    </div>
                    <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="placeholder rounded col-6"></span>
                        </h5>
                        <p class="card-text">
                            <span class="placeholder rounded col-4"></span>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-6 " v-else>
                <DisplaySearch v-for="searchres in fetchSearch"
                :key="searchres.id"
                :id="searchres.id"
                :title="searchres.title"
                :type="searchres.type"
                :poster="searchres.poster"
                :overview="searchres.overview"
                />
            </div>
            <div class="col">
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>