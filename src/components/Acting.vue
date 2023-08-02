<script setup>
    const props = defineProps({
            title: {
                required: true
            },
            character: {
                required: true
            },
            date: {
                required: true
            },
            id: {
                required: true
            },
            type: {
                required: true
            }
        });
    const sendDetails = () => {
        if(props.type == 'movie') {
            window.location.href = `/movie/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        } else {
            window.location.href = `/series/${props.id}-${encodeURIComponent(props.title).replace(/%20/g, '-').replace('.', '')}`;
        }
    }
</script>


<template>
    <li class="list-group-item text-white bg-dark">
        <h5 @click="sendDetails()">{{ date }} {{ title }}</h5>
        <span v-if="character != ''"> as {{  character }}</span>
        <span v-else>Unknown</span>
    </li>
</template>

<style lang="scss" scoped>

</style>