import { useGlobal } from '@/lib/global'
<<<<<<< HEAD
import Link from 'next/link'
=======
import SmartLink from '@/components/SmartLink'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
<<<<<<< HEAD

export default function ArticleCopyright () {
=======
import NotByAI from '@/components/NotByAI'

export default function ArticleCopyright() {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  const router = useRouter()
  const [path, setPath] = useState(siteConfig('LINK') + router.asPath)
  useEffect(() => {
    setPath(window.location.href)
  })

  const { locale } = useGlobal()

  if (!siteConfig('HEXO_ARTICLE_COPYRIGHT', null, CONFIG)) {
    return <></>
  }

  return (
<<<<<<< HEAD
    <section className="dark:text-gray-300 mt-6 mx-1 ">
      <ul className="overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-900 bg-gray-100 p-5 leading-8 border-l-2 border-indigo-500">
        <li>
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <Link href={'/about'} className="hover:underline">
            {siteConfig('AUTHOR')}
          </Link>
        </li>
        <li>
        <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a className="whitespace-normal break-words hover:underline" href={path}>
=======
    <section className='dark:text-gray-300 mt-6 mx-1 '>
      <ul className='overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-900 bg-gray-100 p-5 leading-8 border-l-2 border-indigo-500'>
        <li>
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <SmartLink href={'/about'} className='hover:underline'>
            {siteConfig('AUTHOR')}
          </SmartLink>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a
            className='whitespace-normal break-words hover:underline'
            href={path}>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
            {path}
          </a>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.COPYRIGHT}:</strong>
          {locale.COMMON.COPYRIGHT_NOTICE}
        </li>
<<<<<<< HEAD
      </ul>
    </section>
  );
=======
        {siteConfig('HEXO_ARTICLE_NOT_BY_AI', false, CONFIG) && (
          <li>
            <NotByAI />
          </li>
        )}
      </ul>
    </section>
  )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
}
