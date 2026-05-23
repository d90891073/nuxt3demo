export default defineEventHandler(async () => {
  // 1. 一句话获取 D1 数据库实例
  const db = hubDatabase()
  
  try {
    // 2. 直接执行 SQL
    const { results } = await db.prepare(
      'SELECT * FROM videos ORDER BY id DESC'
    ).all()
    
    return {
      success: true,
      data: results
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Database error: ${error.message}`
    })
  }
})