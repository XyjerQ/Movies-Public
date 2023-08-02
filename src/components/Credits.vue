<script setup>
   const props = defineProps({
            name: {
                required: true
            },
            character: {
                required: true
            },
            id: {
                required: true
            },
        });

    const sendPeople = () => {
        window.location.href = `/people/${props.id}-${encodeURIComponent(props.name).replace(/%20/g, '-').replace('.', '')}`;
    }
</script>

<template>
    <div class="float-start m-2 p-1 border rounded" @click="sendPeople()">
        <span style="font-weight: 600; font-size: small;">{{ character }}</span><br>
        <span style="font-weight: 300; font-size: smaller;" >{{ name }}</span>
    </div>
</template>

<style lang="scss" scoped>

</style>