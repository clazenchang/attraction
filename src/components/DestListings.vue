<script setup>
import { ref, onMounted, reactive } from 'vue'
import DestListing from './DestListing.vue';
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const state = reactive({
  destinations:[],
  isLoading: true
})

defineProps({
  limit: Number,
  showButton: {
    type:Boolean,
    default:false
  }
})

onMounted(async () =>{
  try {
    const response = await axios.get('/api/destinations');      // use proxy (flyio)
    state.destinations = response.data;
  }catch(error){
    console.error('Error fetching destinations', error);
  }finally{
    setTimeout(() => {
      state.isLoading = false;
    }, 500);
  }
})

</script>

<template>
  <section class="bg-green-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Destinations
      </h2>

      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <!-- Data is Loading... -->
        <PulseLoader />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DestListing v-for="dest in state.destinations.slice(0, limit || state.destinations.length)" :key="dest.id" :dest="dest"/> 
          <!-- v-for loop pass obj to child component(DestListing.vue), ':dest' is for props -->
           <!-- then the second "dest" is obj in loop -->
      </div>
    </div>
  </section>


  <!-- the section for "View All" -->
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink to="/destinations"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Destinations</RouterLink>
    </section>

</template>