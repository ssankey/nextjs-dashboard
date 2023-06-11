"use client";
import Provider from './components/Provider'
import './globals.css'



export default function RootLayout({ children }) {
return (
    
        <html lang="en">
          <body>
          <Provider>
            {children}
          </Provider>
          </body>
        </html>
    
  )
}
