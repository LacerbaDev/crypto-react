import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Link,
  useHistory,
  useParams,
  useLocation
} from "react-router-dom";

import './App.css'
import { CircularProgress} from '@material-ui/core'
import WithLoader from './HOC/withLoader'



const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      fetch( "https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(body => {
          setPosts(body)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
      }, 2000)
  }, [])


  return (
    <>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/about" render={(props) => <About {...props}  isLoading={true}/>} /> 
          {/**perchè è un comp a classe, invece nei funzionali usiamo gli hook */}
          <Route path="/users">
            <Users/>
          </Route>
        </Switch>
      </div>
    </Router>
    </>
  )
}

const PostList = ({posts}) => {
  return (
    <>
      {posts.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </>
    
  )
}

const PostListWithLoader = WithLoader(PostList);

export default App

const Home = () => {
  const history = useHistory()
  console.log('history', history)

  const goToAbout = () => {
    history.push('/about')
  }

 return (
    <>
    <button onClick={goToAbout}>Go to about</button>
    <h1>Home</h1>
    </>
   
 )
}
class About extends React.Component {
  goToHome = () => {
    this.props.history.push('/home')
  }
  render() {
    console.log('aio')
    return (
      <>
       <button onClick={this.goToHome}>Go to home</button>
       <h1>About</h1>
      </>

    
    )
  }
}

  
const USERS = [
  {
    id: 1,
    name: 'Pippo'
  },
  {
    id: 2,
    name: 'Ciccio'
  },
  {
    id: 3,
    name: 'Pippuzzo'
  }
]

const Users = () => {
  //const params = useParams()
  //const {id} = useParams() //destrutturiamo params per ottenere l'id
  //const [foundUser, setFoundUser] = useState()
  const {search } = useLocation()
  const [users, setusers] = useState(USERS)


/*   useEffect(() => {
    const user = users.find(user => user.id == Number(id))
    setFoundUser(user?.name || 'Nessun utente trovato')
  }, [id])
   */

  useEffect(() => {
    const params = new URLSearchParams(search)
    const name = params.get('name')
    setusers(USERS.filter(user => user.name.toLowerCase().includes(name.toLowerCase())))
  }, [search])
  return (
    <>
     <h1>Users</h1>
      <ul>
        {users.map((user, i) => {
          return (
            <li key={i}>{user.name}</li>
          )
        })}
        </ul>
    </>
   
  )

  

}