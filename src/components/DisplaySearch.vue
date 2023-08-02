<script setup>
const props = defineProps({
        id: {
            required: true
        },
        title: { 
            required: false
        },
        type: {
            required: true
        },
        poster: {
            required: false
        },
        overview: {
            required: false
        }
        
    });

    const sendDetails = () => {
        if(props.type == 'movie') {
            window.location.href = `/movie/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        } else if(props.type == 'tv') {
            window.location.href = `/series/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        } else if(props.type == 'person') {
            window.location.href = `/people/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        }
    }
</script>

<template>
    <div class="card m-3" style="max-width: 1000px;" @click="sendDetails()">
    <div class="row g-0">
        <div class="col-md-2" style="height: 172px;">
            <img v-if="poster != null" :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+poster" class="card-img-top rounded" style="max-width: 150px;">
            <img v-else class="card-img-top " :alt="'Poster of &quot'+title+'&quot'">
        </div>
        <div class="col-md-10">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ overview }}</p>
        </div>
        </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
    .card:hover {
        background-color: darkgray;
    }
</style>