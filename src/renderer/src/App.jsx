import { Plus } from 'lucide-react'
import React from 'react'
import MinistryLanding from './applications/ministry/ministry-landing'
import PeopleMainApplication from './applications/people/people.app'
import DateTimeWidget from './components/dateTime'
import PrimaryNavigation from './components/primary-navigation'
import WindowTitleBar from './components/window-title-bar'
import DisplayContextProvider from './hooks/context/layout/display.context'
import { useDisplayChanger } from './hooks/context/layout/useDisplayChanger'
import { MinistryContextProvider } from './hooks/context/ministries/ministry-context'
import PeopleContextProvider from './hooks/context/people/people.provider'

const Content = () => {
  const { display } = useDisplayChanger()
  const [database, setDatabase] = React.useState(null)

  React.useEffect(() => {
    const renderDatabase = async () => {
      const result = await window.api.database.getDatabase()
      if (!result.success) {
        setDatabase({
          success: false,
          connected: false,
          ...result
        })
      }
      console.log(result)
      setDatabase(result)
    }
    renderDatabase()
  }, [])

  const layout = {
    home: <div>home</div>,
    people: <PeopleMainApplication />,
    birthday: <div>Birthday</div>,
    ministry: (
      <MinistryContextProvider>
        <MinistryLanding />
      </MinistryContextProvider>
    ),
    equipment: <div>equipment</div>,
    programe: <div>programes</div>,
    report: <div>report</div>,
    document: <div>document</div>,
    settings: <div>settings</div>
  }

  let renderLayout = layout[display]

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white border">
      {/* Fixed title bar */}
      <WindowTitleBar />

      {/* Application body */}
      <section className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <PrimaryNavigation />

        {/* Scrollable content */}
        <main className="flex-1 flex justify-between min-h-0 overflow-y-auto border border-stone-200 bg-stone-100 rounded-lg">
          {/* Your pages go here be sure to render layout */}
          {renderLayout}
        </main>
      </section>

      <footer className="h-12 flex items-center justify-between px-3 text-sm">
        <section className="flex gap-4 items-center">
          <button
            onClick={async () => await window.api.database.createDatabase('church-system-2026')}
            type="button"
            className="size-6 border border-stone-300 bg-stone-100 rounded-lg flex items-center justify-center"
          >
            <Plus size={16} className="size-4" />
          </button>
          <p>Database Name: {database ? `${database.database.name}` : 'No database'}</p>
        </section>
        <DateTimeWidget />
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <DisplayContextProvider>
      <PeopleContextProvider>
        <Content />
      </PeopleContextProvider>
    </DisplayContextProvider>
  )
}

export default App
