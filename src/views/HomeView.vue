<script setup>
import DestListings from '@/components/DestListings.vue';
import Hero from '@/components/Hero.vue'
import HomeCards from '@/components/HomeCards.vue'
</script>

<template>
  <Hero />        <!-- Hero component -->

  <HomeCards />   <!-- show cards -->

  <DestListings :limit="6" :showButton="true" />

</template>