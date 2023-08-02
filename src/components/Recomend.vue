<script setup>

    const props = defineProps({
            id: {
                required: true
            },
            title: {
                required: true
            },
            poster: {
                required: true
            },
            type: {
                required: true
            }
        });
        console.log()
    const sendDetails = () => {
        if(props.type == 'movie') {
            window.location.href = `/movie/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        } else {
            window.location.href = `/series/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        }
    }
</script>

<template>
    <div class="card m-1" style="width: 10rem;"  @click="sendDetails()">
    <img v-if="poster != null" :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+poster" class="card-img-top">
    <img v-else :alt="'Poster of &quot'+title+'&quot'" style="height: 237px; width: 158px; display: block;">
    <div class="card-body">
        <p class="card-title">{{ title }}</p>
    </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .card:hover {
        background-color: darkgray;
    }
</style>