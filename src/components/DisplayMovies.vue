<script setup>
const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        overview: {
            type: String,
            required: true,
        },
        release_date: {
            required: true,
        },
        poster: {
            type: String,
        },
        id: {
            type: Number
        },
    });

const sendDetails = () => {
    window.location.href = `/movie/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
}
</script>

<template>
    <div class="card m-1 gx-0" style="width: 16rem;"  @click="sendDetails()">
    <img v-if="poster != null" :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+poster" class="card-img-top">
    <img v-else style="height: 381px;" class="card-img-top " :alt="'Poster of &quot'+title+'&quot'">
    <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ release_date}}</p>
    </div>
    </div>
    
</template>

<style lang="scss" scoped>
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