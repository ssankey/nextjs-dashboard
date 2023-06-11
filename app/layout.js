"use client";
import Provider from './components/Provider'
import './globals.css'



export default function RootLayout({ children }) {
return (
    
        <html lang="en">
          <meta name="google-site-verification" content="yT-DPUsczh6YEnnHuPrvjrjXiqRa5e_bkSfpzoR_ZiQ" />
          <body>
          <Provider>
            {children}
          </Provider>
          </body>
        </html>
    
  )
}
