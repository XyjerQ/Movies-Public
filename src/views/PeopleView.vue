<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import DisplayPeople from '../components/DisplayPeople.vue'
import * as apikey from '../API/apikey'

const fetchPeople = reactive([])
const page = ref(1)
const scrollComponent = ref(null)
const loadPeople = ref(false)

let i = 0

const load = () => {
      loadPeople.value = true
    } 

const getPeople = () => {
fetch(`https://api.themoviedb.org/3/person/popular?page=${page.value}`, apikey.options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    for(i=0;i < response.results.length; i++) {
            fetchPeople.push({
                id: response.results[i].id,
                name: response.results[i].name,
                poster: response.results[i].profile_path,
            })
        }

        setTimeout(load, 750)
  })
  .catch(err => console.error(err));
}
getPeople();

const loadMore = () => {
    page.value += 1
    getPeople();
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
        </div>
        <div class="col-9">
          <div class="row d-flex justify-content-center " v-if="loadPeople != true">
            <div class="card m-1 gx-0 placeholder-glow" style="width: 16rem;" v-for="n in 12">
            <span style="height: 381px;" class="card-img-top placeholder"></span>
            <div class="card-body">
              <h5 class="card-title">
                <span class="placeholder rounded col-6"></span>
              </h5>
            </div>
            </div>
            
          </div>
          <div class="row d-flex justify-content-center " ref="scrollComponent" v-else>
            <DisplayPeople v-for="people in fetchPeople"
            :key="people.id"
            :id="people.id"
            :name="people.name"
            :poster="people.poster"
            />
          </div>
          <div class="container-fluid d-flex justify-content-center text-dark">
             x
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