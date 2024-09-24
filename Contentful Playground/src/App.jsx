import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useImages } from "./hooks/useImages";
import * as contentful from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "./App.scss";
import { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);

  const client = contentful.createClient({
    space: import.meta.env.VITE_PUBLIC_SPACE_ID,
    accessToken: import.meta.env.VITE_PUBLIC_ACCESS_TOKEN
  });

  useEffect(() => {
    client.getEntries({
      content_type: "product"
    })
    .then((res) => console.log(res)
    )
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log(products);
  }, [])


  let imageUrl = "https://media.sketchfab.com/models/c279c2319ec148fea03e5f88f1288e68/thumbnails/60b35574d155432c9e3209e01f90538c/124759c00c4141fb87e4f90e85ed5a44.jpeg"

  return (
    <>
      <h1>Contentful Products</h1>
      {products?.items?.map((item, index) => {
        return <div key={index}>
          <h4>{item.fields.title}</h4>
          <img src={item.fields.productImage}></img>
          {documentToReactComponents(item.fields.description)}
          </div>
      })}
    </>
  );
}

export default App;
