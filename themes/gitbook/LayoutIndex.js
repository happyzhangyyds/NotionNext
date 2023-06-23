import LayoutBase from './LayoutBase'
import Announcement from './components/Announcement'
import ArticleInfo from './components/ArticleInfo'

export const LayoutIndex = (props) => {
  return <LayoutBase {...props}>
    {/* gitbook主题首页只显示公告 */}
    <Announcement {...props}/>
  </LayoutBase>
}

export default LayoutIndex
