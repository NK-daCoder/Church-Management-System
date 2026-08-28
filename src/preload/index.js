import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import electron from 'electron'

// Custom APIs for renderer
const api = {
  people: {
    createProfile: (payload) => electron.ipcRenderer.invoke('people:create', payload),
    updateProfile: (payload) => electron.ipcRenderer.invoke('people:update', payload),
    deleteProfile: (id) => electron.ipcRenderer.invoke('people:delete', id),
    findProfile: (id) => electron.ipcRenderer.invoke('people:find-by-id', id),
    findAll: () => electron.ipcRenderer.invoke('people:get-all')
  },
  peopleAttendance: {
    
  },
  ministry: {
    createDivisionProfile: (payload) => electron.ipcRenderer.invoke('division:create', payload),
    updateDivisionProfile: (payload) => electron.ipcRenderer.invoke('division:update', payload),
    deleteDivisionProfile: (payload) => electron.ipcRenderer.invoke('division:delete', payload),
    findDivisionProfile: (payload) => electron.ipcRenderer.invoke('division:find-by-id', payload),
    getAllDivisions: () => electron.ipcRenderer.invoke('division:get-all'),
    createMinistry: (payload) => electron.ipcRenderer.invoke('ministry:create', payload),
    findMinistry: (payload) => electron.ipcRenderer.invoke('ministry:find-one', payload),
    getAllMinistries: () => electron.ipcRenderer.invoke('ministry:get-all'),
    updateMinistry: (payload) => electron.ipcRenderer.invoke('ministry:update', payload),
    deleteMinistry: (payload) => electron.ipcRenderer.invoke('ministry:delete', payload)
  },

  database: {
    createDatabase: (dbname) => electron.ipcRenderer.invoke('db:create', dbname),
    removeDatabase: () => electron.ipcRenderer.invoke('db:remove-current'),
    selectDatabase: () => electron.ipcRenderer.invoke('db:choose-database')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
