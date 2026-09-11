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
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white border">
      {/* Fixed title bar */}
      <WindowTitleBar />

      {/* Application body */}
      <section className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <PrimaryNavigation />

        {/* Scrollable content */}
        <main className="flex-1 flex justify-between min-w-0 min-h-0 overflow-y-auto border border-stone-200 bg-stone-100 rounded-lg">
          {/* Your pages go here be sure to render layout */}
          {renderLayout}
        </main>
      </section>

      <footer className="h-8 flex items-center justify-between px-3 text-sm">
        <p>Database Name: </p>
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
