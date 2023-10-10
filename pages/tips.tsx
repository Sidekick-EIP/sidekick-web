"use client";
import React, { useState, useEffect } from 'react';

export default function Tips() {

  const [searchText, setSearchText] = useState('');
  const [randomArticles, setRandomArticles] = useState([]);
  const [articlesData, setArticlesData] = useState([]);


  const getRandomArticles = (allArticles) => {
    const randomSelection = [];
    while (randomSelection.length < 4 && allArticles.length > 0) {
      const randomIndex = Math.floor(Math.random() * allArticles.length);
      randomSelection.push(allArticles.splice(randomIndex, 1)[0]);
    }
    return randomSelection;
  };

  const filteredArticles = articlesData.filter((article) =>
  article.title.toLowerCase().includes(searchText.toLowerCase())
);

  useEffect(() => {
    fetch('/articles.json') // Update the path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        setArticlesData(data.articles);
        const randomArticlesVar = getRandomArticles(data.articles);
        setRandomArticles(randomArticlesVar);
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

      <div className="text-center">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="mt-4 w-64 py-3 ps-4 pe-4 bg-white/[.03] text-white placeholder:text-grey rounded-md text-sm"
          placeholder="search"
        />
      </div>

      <div className="pt-12 max-w-6xl mx-auto fsac4 md:px-1 px-3">
        {searchText
          ? filteredArticles.map((article, index) => (
              <div className="ktq5" key={index}>
                <h3 className="pt-3 font-semibold text-title-faq text-white">{article.title}</h3>
                <p className="pt-2 value-text text-faq text-gray-200 fkrr1">{article.article}</p>
              </div>
            ))
          : randomArticles.map((article, index) => (
              <div className="ktq5" key={index}>
                <h3 className="pt-3 font-semibold text-title-faq text-white">{article.title}</h3>
                <p className="pt-2 value-text text-faq text-gray-200 fkrr1">{article.article}</p>
              </div>
            ))}
      </div>
    </section>
  );
}
