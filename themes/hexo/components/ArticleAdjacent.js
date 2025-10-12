<<<<<<< HEAD
import Link from 'next/link'
=======
import SmartLink from '@/components/SmartLink'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 上一篇，下一篇文章
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleAdjacent ({ prev, next }) {
  if (!prev || !next || !siteConfig('HEXO_ARTICLE_ADJACENT', null, CONFIG)) {
    return <></>
  }
  return (
    <section className='pt-8 text-gray-800 items-center text-xs md:text-sm flex justify-between m-1 '>
<<<<<<< HEAD
      <Link
=======
      <SmartLink
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        href={`/${prev.slug}`}
        passHref
        className='py-1  cursor-pointer hover:underline justify-start items-center dark:text-white flex w-full h-full duration-200'>

        <i className='mr-1 fas fa-angle-left' />{prev.title}

<<<<<<< HEAD
      </Link>
      <Link
=======
      </SmartLink>
      <SmartLink
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        href={`/${next.slug}`}
        passHref
        className='py-1 cursor-pointer hover:underline justify-end items-center dark:text-white flex w-full h-full duration-200'>
        {next.title}
        <i className='ml-1 my-1 fas fa-angle-right' />

<<<<<<< HEAD
      </Link>
=======
      </SmartLink>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    </section>
  )
}
