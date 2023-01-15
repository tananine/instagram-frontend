import BasePage from '/components/BasePage'
import BaseLayout from '/components/Layouts/BaseLayout'
import Tab from '/components/page/index/Tab'
import Post from '/components/shared/Post'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const meName = useSelector(state => state.userInfo.userName)
  useEffect(() => {
    axios
      .get('/profile/get-like')
      .then(res => {
        setLikes(res.data.item)
      })
      .catch(() => {})
    axios
      .get('/feed/get-feeds')
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch(() => {})
  }, [useSelector(state => state.post.postCreate)])

  const feed = () => {
    return posts.map(post => {
      return (
        <Post
          key={post.id}
          postId={post.id}
          media={post.photos}
          userId={post.user.id}
          userName={post.user.name}
          create={post.createdAt}
          caption={post.caption}
          countComment={post.comments?.length}
          like={post.postLikes?.length}
          userImg={post.user.profileImage}
          isLike={() => likes.includes(post.id)}
          meName={meName}
        />
      )
    })
  }

  return (
    <BaseLayout>
      <BasePage title="Instagram">
        <div className="flex pt-[25px]">
          <div className="max-w-[470px]">{feed()}</div>
          <div className="grow pl-[32px]">
            <Tab />
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  )
}

export default Home
