<<<<<<< HEAD
import Link from 'next/link'
=======
import SmartLink from '@/components/SmartLink'
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a

const CategoryGroup = ({ currentCategory, categories }) => {
  if (!categories) {
    return <></>
  }
  return <>
    <div id='category-list' className='dark:border-gray-600 flex flex-wrap  mx-4'>
      {categories.map(category => {
        const selected = currentCategory === category.name
        return (
<<<<<<< HEAD
          <Link
=======
          <SmartLink
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            className={(selected
              ? 'hover:text-white dark:hover:text-white bg-indigo-600 text-white '
              : 'dark:text-gray-400 text-gray-500 hover:text-white dark:hover:text-white hover:bg-indigo-600') +
              '  text-sm w-full items-center duration-300 px-2  cursor-pointer py-1 font-light'}>

            <div> <i className={`mr-2 fas ${selected ? 'fa-folder-open' : 'fa-folder'}`} />{category.name}({category.count})</div>

<<<<<<< HEAD
          </Link>
=======
          </SmartLink>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
        );
      })}
    </div>
  </>;
}

export default CategoryGroup
