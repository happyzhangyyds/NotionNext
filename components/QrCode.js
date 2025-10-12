<<<<<<< HEAD
import { siteConfig } from '@/lib/config'
=======
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 二维码生成
 */
export default function QrCode({ value }) {
<<<<<<< HEAD
  const qrCodeCDN = siteConfig('QR_CODE_CDN')
=======
  const qrCodeCDN =
    process.env.NEXT_PUBLIC_QR_CODE_CDN ||
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

  useEffect(() => {
    let qrcode
    if (!value) {
      return
    }
    loadExternalResource(qrCodeCDN, 'js').then(url => {
      const QRCode = window?.QRCode
      if (typeof QRCode !== 'undefined') {
        qrcode = new QRCode(document.getElementById('qrcode'), {
          text: value,
          width: 256,
          height: 256,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        //   console.log('二维码', qrcode, value)
      }
    })
    return () => {
      if (qrcode) {
        qrcode.clear() // clear the code.
      }
    }
  }, [])

<<<<<<< HEAD
  return <div id="qrcode"></div>
=======
  return <div id='qrcode'></div>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}
