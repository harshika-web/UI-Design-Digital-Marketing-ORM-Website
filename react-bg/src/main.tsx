import React from 'react'
import ReactDOM from 'react-dom/client'
import { BackgroundPaths } from './components/ui/background-paths'
import { ThemeProvider } from './components/theme-provider'
import './index.css'

// Find the target container in the main HTML
const rootElement = document.getElementById('react-bg-container')

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BackgroundPaths />
            </ThemeProvider>
        </React.StrictMode>,
    )
} else {
    console.warn("React background container 'react-bg-container' not found.")
}
