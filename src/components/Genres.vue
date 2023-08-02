
<script setup>
    const props = defineProps({
        id: {
            type: Number,
        },
        name: {
            type: String,
        }
    });
  
    defineEmits(['genreComp'])
</script>

<template>
    <input type="checkbox" :id="id" :value="id" @change="$emit('genreComp', props.id)">
    <label :for="id">{{ name }}</label><br>
</template>


<style lang="scss" scoped>

</style>