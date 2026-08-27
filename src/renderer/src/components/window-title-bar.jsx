import { windowIcon } from '../constants/media/media'
import { Maximize, Minimize2, X } from 'lucide-react'

const titleBar = [
  { key: 'minimize', icon: Minimize2 },
  { key: 'restore', icon: Maximize },
  { key: 'close', icon: X }
]

const WindowTitleBar = () => {
  return (
    <section className="flex justify-between items-center  h-9 pl-3">
      <div className="flex items-center gap-2 text-sm">
        <img src={windowIcon} alt="dominion foundation" className="size-5" />
        <h1 className="text-stone-900 font-medium">Church management system</h1>
      </div>
      <ul className="flex items-center">
        {titleBar.map((element) => (
          <li key={element.key}>
            <button
              type="button"
              className={`size-8 rounded-lg flex items-center justify-center hover:border border-stone-200 ${element.key === 'close' ? 'hover:bg-red-600 hover:text-white' : 'hover:bg-stone-100'}`}
            >
              <element.icon size={16} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WindowTitleBar
