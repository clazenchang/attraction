<script setup>
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'

import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BackButton from '@/components/BackButton.vue';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const deleteDest = async () => {
  if(route.params.id < 7){
    alert("The first six entries are used as a website demo and can't deleted. \n" +
    "(前六筆資料做為網站 Demo 使用，未開放刪除) \n\n"+
    "Please add your own articles to freely edit and delete. \n " +
    "(歡迎自行新增文章以自由刪除與編輯) \n\n" +
    "Thanks! \n" + 
    "(謝謝!)"
     )
  }else{
    try {
      const confirm = window.confirm('Are you sure you want to delete this destination?')
      if(confirm){
        await axios.delete (`/api/destinations/${route.params.id}`)
        toast.success('Destination Deleted Successfully')
        router.push('/destinations')
      }
    } catch (error) {
      console.error('Error deleting destination', error)
      toast.error('Destination Not Deleted')
    } finally { }
  }
}

const state = reactive({
  dest: {},
  isLoading: true
})

onMounted(async () => {
  try {
    const response = await axios.get(`/api/destinations/${route.params.id}`);   // use proxy
    state.dest = response.data;
  } catch (error) {
    console.error('Error fetching ', error);
  } finally {
    setTimeout(() => {
      state.isLoading = false;
    }, 500);
  }
})
</script>


<template>
  <BackButton />
  <!-- data -->
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ state.dest.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.dest.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.dest.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Destination Description
            </h3>

            <p class="mb-4">
              {{ state.dest.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Best Time to Visit</h3>

            <p class="mb-4">{{ state.dest.best_time }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <!-- <h2 class="text-2xl">{{ state.dest.company.name }}</h2> -->

            <p class="my-2">
              {{ state.dest.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.dest.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.dest.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Destination</h3>
            <RouterLink :to="`/destinations/edit/${route.params.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit Destination</RouterLink>
            <button @click="deleteDest"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Destination
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- spinner -->
  <div v-else class="text-center py-6">
    <PulseLoader />
  </div>
</template>