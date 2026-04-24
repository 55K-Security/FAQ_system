import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors({
  origin: ['http://localhost', 'http://127.0.0.1'],
  credentials: true
}))
app.use(express.json())

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === 'admin123') {
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token: 'mock_token_12345',
        username: 'admin',
        role: 1
      }
    })
  } else {
    res.json({ code: 401, message: '用户名或密码错误' })
  }
})

app.put('/api/auth/password', (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    res.json({ code: 400, message: '请填写完整信息' })
    return
  }
  if (oldPassword !== 'admin123') {
    res.json({ code: 400, message: '原密码错误' })
    return
  }
  res.json({ code: 200, message: '密码修改成功' })
})

app.get('/api/system/config', (req, res) => {
  res.json({
    code: 200,
    data: {
      general: {
        system_name: '智能FAQ系统',
        logo: ''
      },
      frontend: {
        search_placeholder: '请输入您的问题，AI将为您提供精准回答',
        no_result_message: '当前暂无相关信息，已自动记录该问题，知识库将持续更新优化',
        page_background: '#f5f7fa'
      },
      switch: {
        ai_switch: 1,
        faq_switch: 1,
        workflow_switch: 1
      }
    }
  })
})

app.get('/api/faq/hot', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/statistic/overview', (req, res) => {
  res.json({
    code: 200,
    data: {
      search: {
        today_searches: 0,
        week_searches: 0,
        faq_matches: 0,
        ai_generations: 0
      },
      feedback: {
        positive: 0,
        negative: 0
      },
      resources: {
        active_faqs: 0,
        active_categories: 0,
        total_files: 0,
        synced_files: 0
      }
    }
  })
})

app.get('/api/statistic/hot', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/ai/stats', (req, res) => {
  res.json({
    code: 200,
    data: { today: 0, week: 0, total: 0 }
  })
})

app.get('/api/auth/profile', (req, res) => {
  res.json({
    code: 200,
    data: {
      id: 1,
      username: 'admin',
      role: 1,
      last_login_time: new Date().toISOString()
    }
  })
})

app.get('/api/faq/list', (req, res) => {
  res.json({
    code: 200,
    data: {
      list: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  })
})

app.get('/api/faq/categories', (req, res) => {
  res.json({
    code: 200,
    data: [
      { id: 1, name: '系统使用', parent_id: 0, sort: 100, status: 1 },
      { id: 2, name: '常见问题', parent_id: 0, sort: 90, status: 1 },
      { id: 3, name: '功能介绍', parent_id: 1, sort: 80, status: 1 }
    ]
  })
})

app.post('/api/faq/category', (req, res) => {
  const { name, parent_id, sort, status } = req.body
  res.json({
    code: 200,
    data: { id: Date.now(), name, parent_id: parent_id || 0, sort: sort || 100, status: status || 1 }
  })
})

app.put('/api/faq/category/:id', (req, res) => {
  const { id } = req.params
  const { name, parent_id, sort, status } = req.body
  res.json({
    code: 200,
    data: { id: parseInt(id), name, parent_id, sort, status }
  })
})

app.delete('/api/faq/category/:id', (req, res) => {
  const { id } = req.params
  res.json({ code: 200, message: '删除成功' })
})

app.get('/api/file', (req, res) => {
  res.json({
    code: 200,
    data: {
      list: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  })
})

app.get('/api/ai/config', (req, res) => {
  res.json({
    code: 200,
    data: {
      provider: 'openai',
      api_url: 'https://api.openai.com/v1',
      model_version: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1000,
      prompt_template: '请根据以下上下文信息回答用户问题。\n\n上下文信息：\n{context}\n\n用户问题：{question}',
      sensitive_words: '',
      reject_template: '当前问题暂无法解答，请咨询相关人员。'
    }
  })
})

app.get('/api/agent/config', (req, res) => {
  res.json({
    code: 200,
    data: {
      intent_rules: {
        rules: []
      },
      decision_chain: { chain: ['intent_recognition', 'faq_retrieval', 'vector_retrieval', 'answer_generation'] },
      dialog_context: { enabled: true, memory_duration: 1800, max_turns: 5 }
    }
  })
})

app.get('/api/workflow/config', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/admin/list', (req, res) => {
  res.json({
    code: 200,
    data: [
      { id: 1, username: 'admin', role: 1, last_login_time: null, status: 1 }
    ]
  })
})

app.put('/api/admin/:id/reset-password', (req, res) => {
  const { id } = req.params
  const { password } = req.body
  if (!password) {
    res.json({ code: 400, message: '请输入新密码' })
    return
  }
  res.json({ code: 200, message: '密码重置成功' })
})

app.get('/api/log/search', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/log/system', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/log/login', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/workflow/log', (req, res) => {
  res.json({
    code: 200,
    data: []
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/faq/question', (req, res) => {
  const { question } = req.body
  const faqs: any[] = []
  const answer = `根据您的问题"${question}"，暂时未找到相关答案。\n\n请尝试：\n1. 调整关键词后重新搜索\n2. 联系管理员添加相关FAQ知识\n3. 上传包含该问题的文档到文件管理`

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const answerId = 'mock_answer_' + Date.now()

  res.write(`data: ${JSON.stringify({ type: 'start', answerId })}\n\n`)

  const chunks = answer.split('\n\n')
  for (const chunk of chunks) {
    if (chunk.trim()) {
      res.write(`data: ${JSON.stringify({ type: 'content', content: chunk + '\n\n' })}\n\n`)
    }
  }

  res.write(`data: ${JSON.stringify({ type: 'faq', faqList: faqs })}\n\n`)

  res.write(`data: ${JSON.stringify({ type: 'end', status: 'success' })}\n\n`)
})

app.listen(PORT, () => {
  console.log(`Mock API Server running on port ${PORT}`)
})
