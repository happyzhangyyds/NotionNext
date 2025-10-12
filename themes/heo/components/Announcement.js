import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  if (post?.blockMap) {
<<<<<<< HEAD
    return <div >
            {post && (
                <div id="announcement-content">
                    <NotionPage post={post} />
                </div>
            )}
        </div>
=======
    return (
      <div>
        {post && (
          <div id='announcement-content'>
            <NotionPage post={post} />
          </div>
        )}
      </div>
    )
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
  } else {
    return <></>
  }
}
export default Announcement
