<script setup>
const { data: response, pending } = await useFetch('/api/videos')
</script>

<template>
  <div>
    <h1>视频列表 (NuxtHub 版)</h1>
    <div v-if="pending">加载中...</div>
    <ul v-else-if="response?.data">
      <li v-for="video in response.data" :key="video.id">
        {{ video.title }}
      </li>
    </ul>
  </div>
</template>