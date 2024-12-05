<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

// defineProps({      // since the inner variable 'dest' only for <template> area,
//   dest:Object;        it can't be use in <script>, so we must declare a JS available for <script>
// })                   , declare a const props below ↓

const props = defineProps({   // dataType:obj (from Destlistings.vue)
  dest: Object
});


const showFullDescription = ref(false);

const truncatedDescription = computed( () => {
  let description = props.dest.description;
  if(!showFullDescription.value){
    description = description.substring(0, 90) + "...";
  }
  return description;
})

function toggleDescription() {
  showFullDescription.value = !showFullDescription.value;
  console.log(showFullDescription.value);
}

</script>



<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ dest.type }}</div>
        <h3 class="text-xl font-bold">{{ dest.title }}</h3>
      </div>

      <div class="mb-5">
        <div>
        {{ truncatedDescription }} 
        </div>
        <!-- toggle show full description -->
        <button @click="toggleDescription()" class="text-green-500 hover:text-green-600 mb-5">
          {{ showFullDescription ? "Less" : "More" }}
        </button>
      </div>

      <h3 class="text-green-500 mb-2">best time: {{ dest.best_time }}</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ dest.location }}
        </div>

        <!-- modulize the url, let it be dynamic -->
        <RouterLink :to="`./destinations/` + dest.id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>