import { DemoLayout } from './layouts/DemoLayout'
import { AppLayout } from './layouts/AppLayout'
import { Expenses } from './pages/Expenses'

export const App = () => (
  <DemoLayout>
    <AppLayout>
      <Expenses />
    </AppLayout>
  </DemoLayout>
)
