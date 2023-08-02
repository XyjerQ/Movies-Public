<script setup>
import { ref } from 'vue';

const query = ref('')

const search = () => {
    if(query.value != '') {
        window.location.href = `/search/${query.value}`;
    }
}
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-light">
    <div class="container-fluid">
    <a class="navbar-brand" href="/">MoViews</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/movie">Movie</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/series">Tv Series</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/people">People</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </li>
        </ul>
        <div class="d-flex">
        <input class="form-control me-2 bg-secondary " placeholder="Search" v-model="query" @keypress.enter="search()">
        <button class="btn btn-outline-secondary" @click="search()">Search</button>
        </div>
    </div>
    </div>
</nav>
</template>

<style lang="scss" scoped>

</style>