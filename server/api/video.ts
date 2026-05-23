export default defineEventHandler(async (event) => {
  // 1. 获取 Cloudflare 的环境变量和绑定
  const cloudflare = event.context.cloudflare

  // 本地开发安全检查：如果不在 CF 环境下，返回 Mock 数据，防止本地运行时报错
  if (!cloudflare || !cloudflare.env || !cloudflare.env.DB) {
    // 如果你配置了本地 wrangler 本地开发，或者只想先看看前端效果，可以留一个 Mock
    return {
      success: true,
      source: 'mock',
      data: [
        { id: 1, title: '本地测试视频 1', url: 'https://example.com/1' },
        { id: 2, title: '本地测试视频 2', url: 'https://example.com/2' }
      ]
    }
  }

  try {
    // 2. 直接通过绑定的 DB 变量执行 SQL 查询（videos 是你的表名）
    const { results } = await cloudflare.env.DB.prepare(
      'SELECT * FROM videos ORDER BY id DESC'
    ).all()

    return {
      success: true,
      source: 'cloudflare_d1',
      data: results
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `D1 Database Error: ${error.message}`
    })
  }
})