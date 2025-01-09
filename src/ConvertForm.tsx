import React, { useRef, useState } from 'react'
import cptable from 'codepage'
import layouts from './layout.module.css'

export default function ConvertForm() {
  const [inputText, setInputText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [inputEncoding, setInputEncoding] = useState(437)
  const inputArea = useRef<HTMLTextAreaElement>(null)

  const convertText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      inputArea?.current?.setCustomValidity('')
      const normalized = inputText.normalize('NFC')
      const encoded = cptable.utils.encode(inputEncoding, normalized)
      setConvertedText(cptable.utils.decode(932, encoded))
    } catch (e) {
      inputArea?.current?.setCustomValidity(
        "The input text couldn't be converted. The text might not be Windows mojibake."
      )
    }

    inputArea?.current?.reportValidity()
  }

  return (
    <>
      <form onSubmit={convertText} className={layouts.formGrid}>
        <div>
          <label htmlFor='input'>Input</label>
          <textarea ref={inputArea} id='input' rows={15} cols={100} value={inputText} onChange={(e) => setInputText(e.target.value)} />
          <input type='submit' />
        </div>
        <details style={{ display: 'none' }}>
          <summary>Advanced settings</summary>
          <select value={inputEncoding} onChange={(e) => setInputEncoding(parseInt(e.target.value, 10))}>
            <option value={437}>IBM code page 437 (Windows US English default)</option>
            <option value={65001}>UTF-8</option>
          </select>
        </details>
        <div>
          <label htmlFor='result'>Result</label>
          <output>
            <textarea id='result' rows={15} cols={100} value={convertedText} readOnly />
          </output>
        </div>
      </form>
    </>
  )
}