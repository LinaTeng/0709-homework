<script setup>
import { Youbike } from "./components/Youbike.js";
import { ref, onMounted, computed } from "vue";

const { stations, getStations } = Youbike();
const keyword = ref("");
const filterStations = ref([]);
const selectedStation = ref(null);
const favorites = ref(JSON.parse(localStorage.getItem("favorites") || "[]"));
const onlyShowFavorites = ref(false)

onMounted(() => {
  getStations();
})

function keywordSearch() {
  filterStations.value = stations.value.filter(
    (s) => s.sna.includes(keyword.value) || s.ar.includes(keyword.value)
  );
  console.log('Filter', filterStations.value)
}

function selectStation(station) {
  selectedStation.value = station;
}

function toggleFavorite(station) {
  const index = favorites.value.findIndex((f) => f.sno === station.sno);
  if (index >= 0) favorites.value.splice(index, 1);
  else favorites.value.push(station);
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
}

function isFavorite(station) {
  return favorites.value.some(f => f.sno === station.sno)
}

const displayedStations = computed(() => {
  return onlyShowFavorites.value
    ? favorites.value
    : filterStations.value
})
</script>

<template>
  <div class="app">
    <h1 class="text-5xl p-4">YouBike 查詢系統</h1>
    <label class="input">
      <svg
        class="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        class=""
        required
        placeholder="請輸入站點名稱或路名"
        v-model="keyword"
        @keyup.enter="keywordSearch"
      />
    </label>
    <button class="btn btn-outline ml-4" @click="keywordSearch">
      搜尋
    </button>
    <h1  @click="onlyShowFavorites = !onlyShowFavorites" class="mb-4 py-2">
      {{ onlyShowFavorites ? '返回全部站點' : '收藏站點' }}
    </h1>

  </div>



<div class="StationList">
    <li
      v-for="(station) in displayedStations"
      :key="station.sno"
      class="station-item "
      @click="selectStation(station)">
       
        <div tabindex="0" class="collapse ">

                <div class="collapse-title text-xl">
                  {{ station.sna }}
                  <p class=" text-base  opacity-60"> {{ station.ar }} </p>
                </div>
                <div v-if="selectedStation" class="collapse-content" >
                  <p>剩餘車輛: {{ selectedStation.available_rent_bikes }}</p>
                  <p>更新時間: {{ selectedStation.updateTime }}</p>
                </div>
             </div> 

        <button class="btn btn-square btn-ghost" @click.stop="toggleFavorite(station)">
          <svg class="size-[1.2em]" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor">
            <path v-if="isFavorite(station)" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="red" />
            <path v-else d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </button>
        
    </li>
 </div>
    



</template>

<style>
.app {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  font-family: sans-serif;
}
.input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.favorites,
.station-list,
.detail {
  margin-top: 1.5rem;
}
</style>
