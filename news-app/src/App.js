import React, { useState, useEffect } from "react";

const searchBar = {
  width: "100%",
  height: "10vh",
  borderBottom: '2px solid lightgrey',
  display: 'flex',
}
const container = {
  margin: 'auto',
}
const searchButton = {
  border: 'grey 1px solid',
  borderRadius: '50px',
  width: '8vw',
  height: "5vh",
  marginLeft: "1vw",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: 'bold',
  background: 'white',
  fontSize: 'medium',
  padding: '.5vh'
}
const input = {
  border: 'lightgrey 1px solid',
  borderRadius: '50px',
  width: '40vw',
  height: "5vh",
  fontFamily: "Arial, Helvetica, sans-serif",
  paddingLeft: '2vh',
  fontSize: 'medium'
}
const articleContainer = {
  border: 'lightgrey 1px solid',
  borderRadius: '15px',
  width: '48vw',
  height: "16vh",
  fontFamily: "Arial, Helvetica, sans-serif",
  margin: 'auto',
  padding: '20px',
  paddingBottom: '30px',
  marginTop: '4vw'
}
const imageIcon = {
  width: '50px',
  height: '50px',
  borderRadius: '100px'
}
const paceHoderImg = {
  width: '50px',
  height: '50px',
  borderRadius: '100px',
  background: 'orange'
}
const articleDeets = {
  color: 'grey',
  paddingLeft: '1vw',
  marginTop: '5vh'
}
const descriptionText = {
  margin: 'auto',
  paddingTop: '3vh',
  height: '4vh',
  overflowY: 'hidden'
}
const link = {
  color: 'inherit',
  textDecoration: 'none'
}
const Article = (props) => {
  let {title, published, author, image, description, url} = props;
  published = new Date(published);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
  <a href={url} style={link}>
  <div
    style={articleContainer}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>
        {image != 'None'? <img style={imageIcon} src={image} alt="Avatar"/> : <div style={paceHoderImg}/>}
      </span>
      <span style={{ paddingLeft: '1vw', fontWeight: 'bold' }}>{title}</span>
    </div>
    <div style={{marginTop: '1vh' }}>
      <span style={articleDeets}>
        {published.toLocaleDateString(undefined,options)}
      </span>
      <span style={articleDeets}>
        {author}
      </span>
    </div>
    <div style={descriptionText}>
      {description}
    </div>
  </div>
  </a>
  );
}
export default function App() {
  const [searchVal, setSearchVal] = useState('');
  const [articles, setArticles] = useState([]);
  const [content, setContent] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    if (articles && !error) {
      setContent(articles.map((a, i) => {
        return (
          <Article
            key={i}
            title={a.title}
            published={a.published}
            author={a.author}
            image={a.image}
            description={a.description}
            url={a.url}/>)
      }))
    }
  }, [articles])
  const search = () => {
    const url = 'https://api.currentsapi.services/v1/search?' +
    `keywords=${searchVal}&language=en&` +
    `apiKey=${API_KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(res => setArticles(res.news))
      .catch(e =>  setError('Error'))
  }
  return (
    <div>
      <div
        style={searchBar}>
        <div style={container}>
          <input
            style={input}
            placeholder="Search..."
            onChange={(e) => setSearchVal(e.target.value)}
            type="text"
          />
          <button
          style={searchButton}
            onClick={() => search(searchVal)}>
          Search</button>
        </div>
      </div>
      <div>
        {content}
        {error&& (<div>ERROR</div>)}
      </div>
    </div>
  );
}
