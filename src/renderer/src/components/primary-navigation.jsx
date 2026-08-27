import {
  Cake,
  Church,
  Code,
  Drill,
  FolderOpen,
  Home,
  ScrollText,
  Settings,
  Users
} from 'lucide-react'
import React from 'react'
import { useDisplayChanger } from '../hooks/context/layout/useDisplayChanger'

const primaryNavElements = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'people', label: 'People', icon: Users },
  { key: 'birthday', label: 'Birthday', icon: Cake },
  { key: 'ministry', label: 'Ministry', icon: Church },
  { key: 'equipment', label: 'Equipment', icon: Drill },
  { key: 'programe', label: 'Programe', icon: Code },
  { key: 'report', label: 'Reports', icon: ScrollText },
  { key: 'document', label: 'Documents', icon: FolderOpen }
]

const secondayNavElements = [{ key: 'settings', icon: Settings }]

const PrimaryNavigation = () => {
  const [activeTab, setActiveTab] = React.useState('home')
  const { setDisplay } = useDisplayChanger()
  return (
    <aside className="h-full">
      <nav className="flex flex-col justify-between h-full">
        <ul className="p-2 gap-2 flex flex-col">
          {primaryNavElements.map(({ key, icon: Icon }) => (
            <li key={key}>
              <button
                type="button"
                title={key}
                className={`${activeTab === key ? 'bg-amber-500 border-t border-white shadow-lg shadow-amber-600 text-white' : ''} cursor-pointer size-8 rounded-lg flex items-center justify-center`}
                onClick={() => {
                  setActiveTab(key)
                  setDisplay(key)
                }}
              >
                <Icon size={16} />
              </button>
            </li>
          ))}
        </ul>

        <ul className="p-2 gap-2 flex flex-col">
          {secondayNavElements.map(({ key, icon: Icon }) => (
            <li key={key}>
              <button
                type="button"
                title={key}
                className={`${activeTab === key ? 'bg-amber-500 border-t border-white shadow-lg shadow-amber-600 text-white' : ''} cursor-pointer size-8 rounded-lg flex items-center justify-center`}
                onClick={() => {
                  setActiveTab(key)
                  setDisplay(key)
                }}
              >
                <Icon size={16} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default PrimaryNavigation
