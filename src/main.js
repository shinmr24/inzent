import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/common.css'
import './assets/css/icon.min.css'
import './lib/common.js'
import './lib/dashboard.js'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app