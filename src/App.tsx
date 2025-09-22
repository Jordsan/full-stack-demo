import { Theme } from '@radix-ui/themes'

import '@radix-ui/themes/styles.css'
import './assets/fonts/satoshi/satoshi.css'
import './assets/fonts/jetbrains-mono/jetbrains-mono.css'
import './App.css'

import Home from './pages/home'
import { PageContainer } from './common/ui'

const App = () => {
  return (
    <Theme appearance="dark" accentColor="indigo" grayColor="slate">
      <PageContainer>
        <Home />
      </PageContainer>
    </Theme>
  )
}

export default App
