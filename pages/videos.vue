<script setup>
// 使用 useFetch 异步获取后端 API 的数据，Nuxt 会自动处理 SSR（服务端渲染）
const { data: response, pending, error } = await useFetch('/api/videos')
</script>

<template>
  <div class="video-container">
    <h1>我的视频列表</h1>

    <!-- 加载状态 -->
    <div v-if="pending" class="loading">正在加载视频数据...</div>

    <!-- 错误处理 -->
    <div v-else-if="error" class="error">
      加载失败: {{ error.statusMessage || '未知错误' }}
    </div>

    <!-- 数据列表 -->
    <div v-else class="video-list">
      <p class="data-source">数据来源: {{ response?.source }}</p>
      
      <ul v-if="response?.data && response.data.length > 0">
        <li v-for="video in response.data" :key="video.id" class="video-item">
          <span class="video-id">#{{ video.id }}</span>
          <strong class="video-title">{{ video.title }}</strong>
          <!-- 这里可以根据你 videos 表实际的字段（比如 url, created_at 等）进行调整 -->
          <a v-if="video.url" :href="video.url" target="_blank" class="video-link">查看视频</a>
        </li>
      </ul>
      
      <p v-else>暂无视频数据。</p>
    </div>
  </div>
</template>

<style scoped>
.video-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: sans-serif;
}
.loading { color: #666; }
.error { color: #df3131; }
.data-source { font-size: 0.8rem; color: #999; }
.video-list ul { list-style: none; padding: 0; }
.video-item {
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f4f4f4;
  border-radius: 4px;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.video-id { color: #888; font-weight: bold; }
.video-title { flex-grow: 1; }
.video-link { color: #0066cc; text-decoration: none; }
.video-link:hover { text-decoration: underline; }
</style>