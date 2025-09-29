const form = document.getElementById('loginForm')
const msg = document.getElementById('msg')
const btn = document.getElementById('btn')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  msg.textContent = ''
  msg.className = 'msg'
  btn.disabled = true

  const userid = document.getElementById('userid').value.trim()
  const password = document.getElementById('password').value

  // client-side validations
  if (!userid || userid.length < 3) {
    msg.textContent = 'User ID must be at least 3 characters.'
    msg.classList.add('err')
    btn.disabled = false
    return
  }
  if (!password || password.length < 6) {
    msg.textContent = 'Password must be at least 6 characters.'
    msg.classList.add('err')
    btn.disabled = false
    return
  }

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid, password })
    })
    const data = await res.json()
    if (!res.ok || !data.ok) {
      msg.textContent = data?.error || 'Login failed'
      msg.classList.add('err')
    } else {
      msg.textContent = data?.message || 'Success!'
      msg.classList.add('ok')
      // optionally redirect after success:
      // window.location.href = '/dashboard.html'
    }
  } catch (err) {
    msg.textContent = 'Network error'
    msg.classList.add('err')
  } finally {
    btn.disabled = false
  }
})
