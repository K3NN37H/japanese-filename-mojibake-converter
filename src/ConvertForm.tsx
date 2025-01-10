import React, { useRef, useState } from 'react'
import layouts from './layout.module.css'
import * as iconv from 'iconv-lite'

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
      const encoded = iconv.encode(normalized, '437')
      const encodedArray = new Uint8Array(encoded)
      const decoder = new TextDecoder('Windows-31J')
      setConvertedText(decoder.decode(encodedArray))
    } catch (e) {
      console.log(e)
      inputArea?.current?.setCustomValidity(
        "The input text couldn't be converted. The text might not be Windows mojibake, or the text was malformed beyond interpretation."
      )
    }

    inputArea?.current?.reportValidity()
  }

  return (
    <>
      <form onSubmit={convertText} className={layouts.formGrid}>
        <div>
          <label htmlFor='input'>Input</label>
          <textarea ref={inputArea} id='input' rows={15} cols={100} value={inputText} onChange={(e) => {
            e.target.setCustomValidity('')
            setInputText(e.target.value)}} />
          <input type='submit' />
          <details style={{ display: 'none' }}>
            <summary>Advanced settings</summary>
            <select value={inputEncoding} onChange={(e) => setInputEncoding(parseInt(e.target.value, 10))}>
              <option value={437}>IBM code page 437 (Windows US English default)</option>
              <option value={65001}>UTF-8</option>
            </select>
          </details>
        </div>
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