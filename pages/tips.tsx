"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { copyFile } from 'fs';
import { refFromURL } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faHeart } from '@fortawesome/free-solid-svg-icons';


type Article = {
  type: string;
  content: {
    number: number;
    title: string;
    category: number;
    article_content: string;
    link: string;
    liked: boolean;
  };
};

export default function Tips() {
  const { data } = useSession();

  const [searchText, setSearchText] = useState('');
  const [RecoArticles, setRecoArticles] = useState<Article[]>([]);
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [showRandom, setShowRandom] = useState(true);
  const [refreshed, setRefreshed] = useState(false);

  const getRandomArticles = (allArticles: Article[]) => {
    var allArticlesTmp = allArticles;
    const randomSelection = [];
    while (randomSelection.length < 4 && allArticlesTmp.length > 0) {
      const randomIndex = Math.floor(Math.random() * allArticlesTmp.length);
      randomSelection.push(allArticlesTmp.splice(randomIndex, 1)[0]);
    }
    console.log(randomSelection[0])
    return randomSelection;
  };

  async function fetchCategory(access_token: string) {

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/user_infos/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      return 1;
    }

    const user_infos = await response.json();

    if (user_infos.goal == "STAY_IN_SHAPE") {
      return 1;
    }
    if (user_infos.goal == "LOSE_WEIGHT") {
      return 2;
    }
    if (user_infos.goal == "BUILD_MUSCLE" || user_infos.goal == "GAIN_MUSCLE_MASS") {
      return 3;
    }
    return 1;
  }

  const getRecomendedArticles = async (allArticles: Article[], randomArticlesVar: Article[]) => {
    const recoSelection = [];
    let allArticlesTmp = [...allArticles];
    var user_category = 0;
    // trouver la category du user
    if (data) {
      try {
        user_category = await fetchCategory(
          data.user.access_token
        );
      } catch (error) {
        console.error("Error fetching category:", error);
        return randomArticles;
      }
    }

    // faire un tableau d'article qui corespond au user 1=stay, 2=lose, 3= muscle
    allArticlesTmp = allArticlesTmp.filter((article) => article.category === user_category);

    //result.map((article) => console.log(article));
    while (recoSelection.length < 4 && allArticlesTmp.length > 0) {
      const randomIndex = Math.floor(Math.random() * allArticlesTmp.length);
      recoSelection.push(allArticlesTmp.splice(randomIndex, 1)[0]);
    }
    console.log(recoSelection[0])
    return recoSelection;
  };


  const filteredArticles = articlesData.filter((article) =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleArticles = () => {
    setShowRandom(!showRandom);
  };

  const handlePostRequest = async (number: number, like: boolean) => {
    var jsondata = ({
      articleNumber: number,
      addLike: like,
    })
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/articles/like", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.user.access_token}`,
        },
        body: JSON.stringify(jsondata),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response is ok and value is:', responseData);
      } else {
        console.error('Error the route is not created yet:', response.statusText);
        console.log("the body of the failing request : ", JSON.stringify(jsondata))
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const toggleArticlesLike = (item: Article, value: boolean) => {
    if (value == true) {
      handlePostRequest(item.number, true)
    }
    else {
      handlePostRequest(item.number, false)
    }
    item.liked = value;
    setRefreshed(!refreshed);
  };

  useEffect(() => {

    fetch('/articles.json')
      .then((response) => response.json())
      .then(async (data) => {
        setArticlesData(data.articles);
        const randomArticlesVar = getRandomArticles(data.articles);
        const recommandedArticlesVar = await getRecomendedArticles(data.articles, randomArticlesVar);
        setRandomArticles(randomArticlesVar);
        setRecoArticles(recommandedArticlesVar);
      });
  }, []);

  return (
    <section className="text-gray-600 body-font">

      <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
        <div className="ktq4 text-center">
          <h3 className="pt-3 font-semibold text-lg text-white">La page conseils</h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Lisez ces articles recommandés ou cherchez un autre article avec la barre de recherche!
          </p>
        </div>

      </div>

      <div className="pt-4 max-w-5xl mx-auto fsac4 md:px-1 px-3">
        <button
          onClick={toggleArticles}
          className="w-64 text-white text-sm mt-4 bg-blue-500 px-3 py-2 rounded-md"
        >{showRandom ? "Recommended" : "Random"}</button>


        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="mt-4 w-64 py-3 ps-4 pe-4 bg-white/[.03] text-white placeholder:text-grey rounded-md text-sm"
          placeholder="search"
          disabled={showRandom}
        />
      </div>

      <div className="pt-12 max-w-6xl mx-auto fsac4 md:px-1 px-3">

        {showRandom
          ? RecoArticles.map((article, index) => (
            <div className="ktq5" key={index}>
              <h3 className="pt-3 font-semibold text-title-faq text-white">{article.title}</h3>
              <p className="pt-2 value-text text-faq text-gray-200 fkrr1">{article.article_content}</p>
              <div>
                <a href={article.link} className="text-blue-500 text-sm">Read More</a>
                {article.liked ?
                  <button className="text-blue-500 text-sm mt-4 ml-40" onClick={() => {
                    toggleArticlesLike(article, false)
                  }} >
                    <FontAwesomeIcon icon={faHeart} /> Liked !
                  </button>
                  :
                  <button className="text-white text-sm mt-4 ml-40" onClick={() => {
                    toggleArticlesLike(article, true)
                  }} >
                    <FontAwesomeIcon icon={faHeart} /> add like
                  </button>
                }
              </div>
            </div>
          ))
          : filteredArticles.map((article, index) => (
            <div className="ktq5" key={index}>
              <h3 className="pt-3 font-semibold text-title-faq text-white">{article.title}</h3>
              <p className="pt-2 value-text text-faq text-gray-200 fkrr1">{article.article_content}</p>
              <div>
                <a href={article.link} className="text-blue-500 text-sm mt-4">Read More</a>

                {article.liked ?
                  <button className="text-blue-500 text-sm mt-4 ml-40" onClick={() => {
                    toggleArticlesLike(article, false)
                  }} >
                    <FontAwesomeIcon icon={faHeart} /> Liked !
                  </button>
                  :
                  <button className="text-white text-sm mt-4 ml-40" onClick={() => {
                    toggleArticlesLike(article, true)
                  }} >
                    <FontAwesomeIcon icon={faHeart} /> add like
                  </button>
                }
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}


// modification du bouton, fix de la recherche, limité la recherche sur la page random, limité le nombre d'article affiché en random, envoie d'une requete post et ajout du bouton like
