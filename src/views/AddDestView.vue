<script setup>
import { reactive } from 'vue'
import axios from 'axios';
import router from '@/router';
import { useToast } from 'vue-toastification'; 

const form = reactive({
  type: 'Nature',
  title: '',
  description: '',
  location: '',
  best_time: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  }
})

const toast = useToast();

const handleSubmit = async () => {
  const newDest = {
    title: form.title,
    type: form.type,
    location: form.location,
    description: form.description,
    best_time: form.best_time,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone
    }
  }
  try {
    const response = await axios.post('/api/destinations/', newDest)   // use proxy
    toast.success('Destination Add Successfully')
    router.push(`/destinations/${response.data.id}`)
  }catch(error){
    console.error("Error", error)
    toast.error('Destination Was Not Added')
  }finally{}
}

</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Destination</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Destination Type</label>
            <select id="type" name="type" v-model="form.type" class="border rounded w-full py-2 px-3" required>
              <option value="Nature">Nature</option>
              <option value="Historical">Historical</option>
              <option value="Urban">Urban</option>
              <option value="Beach">Beach</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Destination Name</label>
            <input type="text" id="name" name="name" v-model="form.title" 
            class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea id="description" name="description" v-model="form.description"
            class="border rounded w-full py-2 px-3" rows="4"
              placeholder="Add details about the destination, its history, and any interesting facts"></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Best Time to Visit</label>
            <select id="best_time" name="best_time" v-model="form.best_time" class="border rounded w-full py-2 px-3" required>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input type="text" id="location" name="location" v-model="form.location"
            class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Destination Location" required />
          </div>

          <h3 class="text-2xl mb-5">Tour Information</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2">Tour Company</label>
            <input type="text" id="company" name="company" v-model="form.company.name"
            class="border rounded w-full py-2 px-3"
              placeholder="Tour Company Name" />
          </div>

          <div class="mb-4">
            <label for="company_description" class="block text-gray-700 font-bold mb-2">Company Description</label>
            <textarea id="company_description" name="company_description" v-model="form.company.description" 
            class="border rounded w-full py-2 px-3"
              rows="4" placeholder="What does your tour company offer?"></textarea>
          </div>

          <div class="mb-4">
            <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input type="email" id="contact_email" name="contact_email" v-model="form.company.contactEmail" 
            class="border rounded w-full py-2 px-3"
              placeholder="Email address for inquiries" required />
          </div>
          <div class="mb-4">
            <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input type="tel" id="contact_phone" name="contact_phone" v-model="form.company.contactPhone"
            class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for inquiries" />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Add Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>