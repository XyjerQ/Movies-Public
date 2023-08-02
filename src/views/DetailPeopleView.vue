<script setup>
import { reactive, ref } from 'vue';
import Recomend from '../components/Recomend.vue'
import Acting from '../components/Acting.vue'
import * as apikey from '../API/apikey'

    const props = defineProps({
        id: {
            required: true
        },
        name: {
            required: true
        },
    });

    const fetchPeople = reactive([])
    const bioArr = reactive([])
    const sortCast = reactive([])
    const sortDate = reactive([])
    const age = ref()
    const loadPeople = ref(false)
    const loadCast = ref(false)


    let i = 0
    let ageArr = null
    let dateArr = null

    const loadP = () => {
        loadPeople.value = true
    }

    const loadC = () => {
        loadCast.value = true
    }

    fetch(`https://api.themoviedb.org/3/person/${props.id}`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        Object.assign(fetchPeople, {
            name: response.name,
            gender: response.gender,
            biography: response.biography,
            birthday: response.birthday,
            deathday: response.deathday,
            knownFor: response.known_for_department,
            placeOfBirth: response.place_of_birth,
            popularity: response.popularity.toFixed(1),
            path: response.profile_path
        })
        if(fetchPeople.birthday != null) {
            ageArr = fetchPeople.birthday.split("-")
        }
        if(fetchPeople.deathday == null && fetchPeople.birthday != null) {
            age.value = calculate_age(new Date(ageArr[0], ageArr[1], ageArr[2]));
        } else if(fetchPeople.birthday != null) {
            const deathArr = fetchPeople.deathday.split("-")
            age.value =  deathArr[0] - ageArr[0]
        }
    
        bioArr.value = fetchPeople.biography.split("\n")
        
        if(bioArr.value[0] != '') {
            console.log(bioArr.value[0])
            for(i = 0; i < bioArr.value.length; i++) {
                if(bioArr.value[i] == '') {
                    bioArr.value.splice(i, 1)
                }
            }
        } else {
            bioArr.value = null
        }
        
        setTimeout(loadP, 750)
    })
    .catch(err => console.error(err));

    fetch(`https://api.themoviedb.org/3/person/${props.id}/combined_credits`, apikey.options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        for(i = 0; i < response.cast.length; i++) {
            if(response.cast[i].media_type == 'movie'){
                sortCast.push({
                    title: response.cast[i].title,
                    popularity: response.cast[i].popularity,
                    poster: response.cast[i].poster_path,
                    id: response.cast[i].id,
                    type: response.cast[i].media_type,
                    release: response.cast[i].release_date,
                    character: response.cast[i].character,
                })
            } else {
                sortCast.push({
                    title: response.cast[i].name,
                    popularity: response.cast[i].popularity,
                    poster: response.cast[i].poster_path,
                    id: response.cast[i].id,
                    type: response.cast[i].media_type,
                    release: response.cast[i].release_date,
                    character: response.cast[i].character,
                })
            }
        }
        sortCast.sort((a, b) => b.popularity - a.popularity);

        for(i = 0; i < response.cast.length; i++) {
            if(response.cast[i].release_date != undefined) {
                dateArr = response.cast[i].release_date.split("-")
            }
            if(response.cast[i].media_type == 'movie'){
            sortDate.push({
                title: response.cast[i].title,
                id: response.cast[i].id,
                release: dateArr[0],
                character: response.cast[i].character,
                type: response.cast[i].media_type
            })
        } else {
            sortDate.push({
                title: response.cast[i].name,
                id: response.cast[i].id,
                release: dateArr[0],
                character: response.cast[i].character,
                type: response.cast[i].media_type
            })
        }
        }
        sortDate.sort((a, b) => b.release - a.release);
        setTimeout(loadC, 750)
    })
    .catch(err => console.error(err));

    function calculate_age(dob) { 
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
    
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
</script>

<template>
    <div class="bg-dark text-light border-top border-light d-flex">
        <div class="container-fluid h-75 d-flex justify-content-center m-2">
            <div class="row m-3 w-100 border border-secondary rounded">
                <div class="col py-5">
                    <div class="d-flex justify-content-center placeholder-glow">
                        <span v-if="loadPeople != true" class="placeholder rounded" style="height: 500px; width: 333px;"></span>
                        <span v-else>
                        <img v-if="fetchPeople.path == null" src="../assets/NoPerson.jpg" style="height: 500px; width: 333px;">
                        <img v-else class="rounded" :src="'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'+fetchPeople.path" :alt="'Photo of '+name" style="height: 500px;">
                        </span>
                    </div>
                    <div class="conteiner-fluid text-center py-2 placeholder-glow">
                        <h3 >Info about
                            <span v-if="loadPeople != true" class="placeholder rounded col-3"></span>
                            <span v-else>{{ fetchPeople.name }}</span>
                        </h3>
                        <div>
                            <h5>Popularity:</h5>
                            <span v-if="loadPeople != true" class="placeholder rounded col-1 mb-3 mt-1"></span>
                            <span v-else>
                                <p v-if="fetchPeople.popularity != null">{{ fetchPeople.popularity }}</p>
                                <p v-else>Undefined</p>
                            </span>
                        </div>
                        <div>
                            <h5>Known for:</h5>
                            <span v-if="loadPeople != true" class="placeholder rounded col-1 mb-3 mt-1"></span>
                            <span v-else>
                                <p v-if="fetchPeople.knownFor != null">{{ fetchPeople.knownFor }}</p>
                                <p v-else>Undefined</p>
                            </span>
                        </div>
                        <div>
                            <h5>Gender:</h5>
                            <span v-if="loadPeople != true" class="placeholder rounded col-1 mb-3 mt-1"></span>
                            <span v-else>
                                <p v-if="fetchPeople.gender == 1">Female</p>
                                <p v-else-if="fetchPeople.gender == 2">Male</p>
                                <p v-else>Undefined</p>
                            </span>
                        </div>
                        <div>
                            <h5>Birthday:</h5>
                            <span v-if="loadPeople != true" class="placeholder rounded col-2 mb-3 mt-1"></span>
                            <span v-else>
                                <p v-if="fetchPeople.birthday != null">{{ fetchPeople.birthday }} <span v-if="fetchPeople.deathday == null">({{ age }} years)</span></p>
                                <p v-else>Undefined</p>
                            </span>
                        </div>
                        <div v-if="fetchPeople.deathday != null">
                            <h5>Deathday:</h5>
                            <p >{{ fetchPeople.deathday }} ({{ age }} years)</p>
                        </div>
                        <div>
                            <h5>Place of birth:</h5>
                            <span v-if="loadPeople != true" class="placeholder rounded col-2 mb-3 mt-1"></span>
                            <span v-else>
                                <p v-if="fetchPeople.placeOfBirth != null">{{ fetchPeople.placeOfBirth}}</p>
                                <p v-else>Undefined</p>
                            </span>
                        </div>
                    </div>
                </div>
               
                <div class="col-7 placeholder-glow">
                    <div class="conteiner-fluid pt-5 ">
                        <h1 v-if="loadPeople != true" class="placeholder rounded col-3"></h1>
                        <h1 v-else>{{ fetchPeople.name }}</h1>
                    </div>
                    <div class="my-2">
                        <h3>Biography</h3>
                        <span v-if="loadPeople != true" class="placeholder rounded col-12" style="height: 150px;"></span>
                        <span v-else>
                        <div v-if="bioArr.value != null" v-for="bio in bioArr.value">
                            <p>{{ bio }}</p>
                        </div>
                        <div v-else>
                            Unwritten
                        </div>
                        </span>
                        <div>
                            <h3>Acting</h3>
                            <div class="container overflow-auto" style="height: 300px;">
                            <ul class="list-group placeholder-glow">
                                <li v-if="loadCast != true" class="list-group-item text-white bg-dark" v-for="n in 6">
                                    <h5 class="placeholder rounded col-3 my-1"></h5><br>
                                    <span class="placeholder rounded col-2"></span>
                                </li>
                                <Acting v-else v-for="cast in sortDate"
                                :key="cast.id"
                                :id="cast.id"
                                :date="cast.release"
                                :character="cast.character"
                                :title="cast.title"
                                :type="cast.type"/>
                            </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid text-light">
    <h3>Known for:</h3>
    <div class="scrolling-wrapper placeholder-glow">
        <div v-if="loadCast != true" class="card m-1 placeholder-glow" style="width: 10rem;" v-for="n in 15">
            <span class="card-img-top rounded placeholder" style="height: 237px; width: 158px;"></span>
            <div class="card-body">
                <h5 class="card-title placeholder rounded col-9"></h5>
            </div>
            </div>

        <Recomend v-else v-for="recomended in sortCast"
            :key="recomended.id"
            :id="recomended.id"
            :title="recomended.title"
            :poster="recomended.poster"
            :type="recomended.type"
            />
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