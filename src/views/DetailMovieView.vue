<script setup>
import { reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import Recomend from '../components/Recomend.vue'
import Credits from '../components/Credits.vue'
import * as apikey from '../API/apikey'


    const props = defineProps({
            id: {
                type: String,
                required: true
            },
            title: {
                required: true
            }
        });
        
    const fetchDetails = reactive({})
    const fetchCast = reactive([])
    const fetchTrailer = reactive([])
    const fetchRecomend = reactive([])
    const loadDetails = ref(false)
    const loadTrailer = ref(false)
    const loadCast = ref(false)
    const loadRecomend = ref(false)
    
    let i = 0;
    let hours = null;
    let minutes = null;

    const loadD = () => {
        loadDetails.value = true
    }

    const loadT = () => {
        loadTrailer.value = true
    }

    const loadC = () => {
        loadCast.value = true
    }

    const loadR = () => {
        loadRecomend.value = true
    }

    fetch(`https://api.themoviedb.org/3/movie/${props.id}?language=en-US`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        Object.assign(fetchDetails, {
            title: response.title,
            poster: response.poster_path,
            runtime: response.runtime,
            genres: response.genres,
            overview: response.overview,
            release: response.release_date,
            vote_avg: response.vote_average.toFixed(1),
            vote_count: response.vote_count,
            status: response.status
        })    
        toHoursAndMinutes(fetchDetails.runtime)
        setTimeout(loadD, 500)
    })
    .catch(err => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits?language=en-US`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response.cast)
            for(i = 0; i < response.cast.length; i++) {
                if(response.cast[i].character != '' && response.cast[i].name != '') {
                 fetchCast.push({
                    id: response.cast[i].id,
                    name: response.cast[i].name,
                    character: response.cast[i].character,
                 })   
                }
                
            }
            console.log(fetchCast)
            setTimeout(loadC, 500)
    })
    .catch(err => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${props.id}/videos`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response.results)
            for(i = 0; i < response.results.length; i++) {
                if(response.results[i].type == 'Trailer') {
                    fetchTrailer.push({
                    key: response.results[i].key
                    })
                    setTimeout(loadT, 500)
                    return;
                }
            }
            console.log(fetchTrailer)
            setTimeout(loadT, 500)

    })
    .catch(err => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${props.id}/recommendations`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        for(i = 0; i < response.results.length; i++) {
            fetchRecomend.push({
                id: response.results[i].id,
                title: response.results[i].title,
                poster: response.results[i].poster_path,
                rate: response.results[i].vote_average.toFixed(1),
                type: response.results[i].media_type
            })
        }
        setTimeout(loadR, 500)

    })
    .catch(err => console.error(err));
    
    function toHoursAndMinutes(totalMinutes) {
     hours = Math.floor(totalMinutes / 60);
     minutes = totalMinutes % 60;

    return { hours, minutes };
    }
    
  
</script>

<template>
    <div class="bg-dark text-light border-top border-light d-flex">
        <div class="container-fluid h-75 d-flex justify-content-center m-2">
            <div class="row my-3 w-100 border border-secondary rounded">
                <div class="col d-flex py-5 justify-content-center placeholder-glow ">
                    <span v-if="loadDetails != true" class="rounded placeholder" style="height: 800px; width: 533px;"></span>
                    <span v-else>
                     <img v-if="fetchDetails.poster == null" class="rounded" src="../assets/NoPicture.jpg" style="height: 800px; width: 533px;">
                     <img v-else class="rounded" :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+fetchDetails.poster" alt="" style="height: 800px; width: 533px;">
                    </span>
                    </div>
                <div class="col-7">
                    <div v-if="loadDetails != true" class="conteiner-fluid pt-5 placeholder-glow">
                        <h1>
                            <span class="rounded placeholder col-3"></span>
                        </h1>
                        <div>
                            <span>
                                <span class="rounded placeholder col-6"></span>
                            </span>
                        </div>
                    </div>
                    <div v-else class="conteiner-fluid pt-5 ">
                        <h1>{{ fetchDetails.title }}</h1>
                        <div>
                            <span>
                                <span v-if="fetchDetails.release != ''">{{ fetchDetails.release }} • </span> 
                                <span v-for="genre in fetchDetails.genres">{{ genre.name }} • </span> 
                                <span v-if="hours != 0">{{ hours }}h <span v-if="minutes == 0">({{ fetchDetails.status }})</span></span>
                                <span v-if="minutes != 0">{{ minutes }}m ({{ fetchDetails.status }})</span>
                                <span v-if="minutes == 0 && hours == 0">({{ fetchDetails.status }})</span>
                            </span>
                        </div>
                    </div>
                    <div class="my-2 placeholder-glow">
                        <h3>
                            Rating: 
                            <span v-if="loadDetails != true" class="rounded placeholder" style="width: 70px;"></span>
                            <span v-else>{{ fetchDetails.vote_avg }}<Icon icon="noto:star" style="margin-bottom: 5px;"/></span>
                            
                            Votes: 
                            <span v-if="loadDetails != true" class="rounded placeholder" style="width: 75px;"></span>
                            <span v-else>{{ fetchDetails.vote_count }}<Icon icon="fluent:people-28-filled" style="margin-bottom: 5px;"/></span> 
                        </h3>
                    </div>
                    <div class="placeholder-glow">
                        <h3>Overview</h3>
                        <h1 v-if="loadDetails != true" class="placeholder rounded col-11"></h1>
                        <p v-else>{{ fetchDetails.overview }}</p>
                    </div>
                    <div v-if="loadTrailer != true" class="placeholder-glow">
                        <h3>Trailer</h3>
                        <span  class="placeholder rounded" style="height: 315px; width: 560px;"></span>
                    </div>
                    <div v-else v-if="fetchTrailer != ''">
                        <h3>Trailer</h3>
                        <span >
                            <iframe 
                            width="560" 
                            height="315" 
                            :src="'https://www.youtube-nocookie.com/embed/'+fetchTrailer[0].key" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen></iframe>
                        </span>
                    </div>
                    <div style="height: 350px;">
                        <h3>Credits</h3>
                        <div v-if="loadCast != true" class="container overflow-auto" style="height: 300px;">
                            <div class="float-start m-2 p-1 border rounded placeholder-glow" style="width: 100px;" v-for="n in 10">
                                <span class="placeholder rounded" style="width: 50px;"></span><br>
                                <span class="rounded placeholder" style="width: 70px;"></span>
                            </div>
                        </div>
                        <div v-else class="container overflow-auto" style="height: 300px;">
                            <Credits v-for="cast in fetchCast"
                            :key="cast.id"
                            :id="cast.id"
                            :character="cast.character"
                            :name="cast.name"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loadRecomend != true" class="container-fluid text-light">
        <h2>Recommendations</h2>
        <div class="scrolling-wrapper">
            <div class="card m-1 placeholder-glow" style="width: 10rem;" v-for="n in 15">
            <span class="card-img-top rounded placeholder" style="height: 237px;"></span>
            <div class="card-body">
                <h5 class="card-title placeholder rounded col-9"></h5>
            </div>
            </div>
          </div>
    </div>
    <div v-else class="container-fluid text-light" v-if="fetchRecomend != ''">
        <h2>Recommendations</h2>
        <div class="scrolling-wrapper">
            <Recomend v-for="recomended in fetchRecomend"
            :key="recomended.id"
            :id="recomended.id"
            :title="recomended.title"
            :poster="recomended.poster"
            :type="recomended.type"
            />
          </div>
    </div>
  
    
</template>

<style lang="scss">
    .scrolling-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

        .card {
            display: inline-block;
        }
    }
</style>