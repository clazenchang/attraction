<script setup>
import Card from '@/components/Card.vue'
import { RouterLink } from 'vue-router';
</script>


<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

        <Card>
          <h2 class="text-2xl font-bold">For travelers</h2>
          <p class="mt-2 mb-4">
            Browse our destinations and start your travel today
          </p>
          <RouterLink to="/destinations" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
            Browse Destinations
          </RouterLink>
        </Card>
        <!--  -->
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">For Travel Agencies</h2>
          <p class="mt-2 mb-4">
            List destinations and reach potential travelers.
          </p>
          <RouterLink to="/destinations/add" class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
            Add Destination
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>