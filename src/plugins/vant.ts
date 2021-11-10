import type { App } from 'vue'

import Vant from 'vant'
import 'vant/lib/index.css'

export function setupVant(app: App<Element>) {
  app.use(Vant)
}
