import React from 'react'
import CategoryItem from './CategoryItem'

const CategoryGroup = ({ currentCategory, categories }) => {
  if (!categories) {
    return <></>
  }
  return <div id='category-list' className='pt-4'>
    <div className='mb-2'><i className='mr-2 fas fa-th' />分类</div>
    <div className='flex flex-wrap'>
      {Object.keys(categories).map(category => {
        const selected = currentCategory === category
        const categoryCount = +categories[category]
        return <CategoryItem key={category} selected={selected} category={category} categoryCount={categoryCount}/>
      })}
    </div>
  </div>
}

export default CategoryGroup
