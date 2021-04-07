import React, { useState, useEffect } from "react";
import Logo from "../../components/Logo";
import Category from "./category";
import "./learn.css";
import "./articles.css";
import Articles from "./articles";
import { Button } from "antd";
import mockData from "./mockData.json";
import axios from "axios";

type stateObject = {
  isLearning: boolean;
  setLearning: any;
  articleCategory: string;
  setarticleCategory: any;
  articleDifficulty: string;
  setarticleDifficulty: any;
};

type backendData = {
  author: any;
  content: string;
  dateUpdated: string;
  difficulty: string;
  title: string;
  topic: any;
  id: string;
};

// Please disregard lines 25 - 398 from the total line count.
axios.get('localhost:5000/learn/articles').then((response) => {
  console.log(response.data)
})
const dataFromBackend: Array<any> = mockData;

export const fetchCategories = () => {
  const easy: Array<backendData> = [];
  const medium: Array<backendData> = [];
  const hard: Array<backendData> = [];
  dataFromBackend.map((element) => {
    if (element.difficulty === "easy") {
      easy.push(element);
    } else if (element.difficulty === "medium") {
      medium.push(element);
    } else {
      hard.push(element);
    }
  });
  return {
    easy: easy,
    medium: medium,
    hard: hard,
  };
};

export const fetchArticles = (
  elementCategory: string,
  elementDifficulty: string
) => {
  const returnedArticles: Array<backendData> = [];
  dataFromBackend.map((element) => {
    if (
      element.category == elementCategory &&
      element.difficulty == elementDifficulty
    ) {
      returnedArticles.push(element);
    }
  });
  return returnedArticles;
};

const userView = (viewState: stateObject) => {
  const data = fetchCategories();
  if (viewState.isLearning) {
    console.log(
      fetchArticles(viewState.articleCategory, viewState.articleDifficulty)
    );
    return (
      // <Articles
      //   articles={fetchArticles(
      //     viewState.articleCategory,
      //     viewState.articleDifficulty
      //   )}
      //   state={viewState}
      // />
      <>
      </>
    );
  } else {
    return (
      <div className="test">
        <Logo page="Learn With VUMS" />
        <div className="categories">
          {/* spread the state when we click the button */}
          {/* easy */}
          {/* <Category
            difficulty={"easy"}
            categories={data.easy}
            state={viewState}
          /> */}
          {/* medium */}
          {/* <Category
            difficulty={"medium"}
            categories={data.medium}
            state={viewState}
          /> */}
          {/* hard */}
          {/* <Category
            difficulty={"hard"}
            categories={data.hard}
            state={viewState}
          /> */}
        </div>
      </div>
    );
  }
};

const Learn: React.FC<Record<string, never>> = () => {

  useEffect(() => {
    // localhost is the server which we use in development
    // we will use heroku services in deployment.
    axios.get("http://localhost:5000/learn/articles").then((res) => {
      // setEvents(res.data);
      console.log(res.data)
    });
  }, []);


  // is learning will see if the user clicks on the category
  const [isLearning, setLearning] = useState(false);

  // article category will be the current category that the user clicks.
  const [articleCategory, setarticleCategory] = useState("Bacteria");

  // article difficulty will be the difficulty that the user clicks on.
  const [articleDifficulty, setarticleDifficulty] = useState("Easy");

  // complex state dictates the users actions.
  const viewState: stateObject = {
    isLearning: isLearning,
    setLearning: setLearning,
    articleCategory: articleCategory,
    setarticleCategory: setarticleCategory,
    articleDifficulty: articleDifficulty,
    setarticleDifficulty: setarticleDifficulty,
  };
  const returnedView = userView(viewState);
  return <div>{returnedView}</div>;
};

export default Learn;
