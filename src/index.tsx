import React from 'react'
import { createRoot } from 'react-dom/client'

import ConvertForm from './ConvertForm.js'

function App() {
  return (
    <>
      <h1>Japanese Filename Mojibake Converter</h1>
      <p>Have some files with Japanese names that have been garbled into mojibake? Paste them into the box, hit Submit and they'll be converted to the correct Japanese below.</p>
      <details>
        <summary>Technical Details</summary>
        <p>This usually happens because the files were named on a Japanese Windows computer using system locale Shift-JIS (technically <a href='https://en.wikipedia.org/wiki/Code_page_932_(Microsoft_Windows)'>code page 932</a>). When they're archived into a ZIP, their filenames are also stored as Shift-JIS in the ZIP.</p>
        <p>The <cite><a href='https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT'>ZIP specification</a></cite> doesn't have a standardized way to specify the encoding used for the filenames. It only contains a flag to mark if it's in UTF-8 or not.</p>
        <p>If UTF-8 is not specified, it generally seems to recommend treating it as <a href='https://en.wikipedia.org/wiki/Code_page_437'>IBM code page 437</a> encoding, as per the originally specified ZIP character encoding back in 1989.</p>
        <p>Windows (either following this recommendation or using the currently set locale, unknown which) interprets the filenames as code page 437 encoded when unzipping. Since the encoding was actually Shift-JIS, using code page 437 causes the names to come out as garbled mojibake.</p>
      </details>
      <ConvertForm />
    </>
  )
}

const root = createRoot(document.getElementById('root-container')!)
root.render(<App />)
