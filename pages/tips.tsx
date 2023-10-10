"use client";
import Faqcomponent from "../components/Faqcomponent";
import React, { useState, useEffect } from 'react';

export default function Tips() {

  const [randomArticles, setRandomArticles] = useState([]);
  var articlesData;

  // Function to get 4 random articles
  const getRandomArticles = () => {
    const articles = [...articlesData.articles];
    const randomSelection = [];

    while (randomSelection.length < 4 && articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      randomSelection.push(articles.splice(randomIndex, 1)[0]);
    }

    return randomSelection;
  };

  useEffect(() => {
    // Fetch JSON data from public/articles.json
    fetch('articles.json') // This URL starts from the public directory
      .then((response) => response.json())
      .then((data) => {
        // Set random articles when the component mounts
        articlesData = data
        const randomArticles_var = getRandomArticles();
        setRandomArticles(randomArticles_var);
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
          <input></input>
        </div>
      </div>

      <div className="pt-12 max-w-6xl mx-auto fsac4 md:px-1 px-3">
        {randomArticles.map((article, index) => (
          <div className="ktq5" key={index}>
            <h3 className="pt-3 font-semibold text-title-faq text-white">{article.title}</h3>
            <p className="pt-2 value-text text-faq text-gray-200 fkrr1">{article.article}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


    // return (
    //     <section className="text-gray-600 body-font">

    //   <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
    //     <div className="ktq4 text-center">
    //       <h3 className="pt-3 font-semibold text-lg text-white">
    //         La page conseils
    //       </h3>
    //       <p className="pt-2 value-text text-md text-gray-200 fkrr1">
    //         Lisez ces articles recomender ou chercher un autre article avec la barre de recherche !
    //         </p>
    //         <input></input>
    //     </div>
    //   </div>

    //   <div className="pt-12 max-w-6xl mx-auto fsac4 md:px-1 px-3">
    //     <div className="ktq5">
    //       <h3 className="pt-3 font-semibold text-title-faq text-white">
    //         Qu'est-ce que Sidekick et en quoi consiste ce projet ?
    //       </h3>
    //       <p className="pt-2 value-text text-faq text-gray-200 fkrr1">
    //         Sidekick est une application qui met en relation deux personnes inconnues afin qu'elles puissent s'entraider pour atteindre leurs objectifs communs, que ce soit dans le domaine du sport et/ou d'un plan alimentaire.
    //       </p>
    //     </div>

    //     <div className="ktq5">
    //       <h3 className="pt-3 font-semibold text-title-faq text-white">
    //         Comment fonctionne Sidekick ?
    //       </h3>
    //       <p className="pt-2 value-text text-faq text-gray-200 fkrr1">
    //         Sidekick permet aux utilisateurs de se connecter en fonction de leurs intérêts sportifs et de leurs objectifs. L'application propose des binômes de partenaires qui s'encouragent mutuellement à atteindre leurs buts.
    //       </p>
    //     </div>

    //     <div className="ktq5">
    //       <h3 className="pt-3 font-semibold text-title-faq text-white">
    //         Quels sont les avantages de l'utilisation de Sidekick ?
    //       </h3>
    //       <p className="pt-2 value-text text-faq text-gray-200 fkrr1">
    //         Sidekick offre une approche collaborative pour rester motivé dans vos activités sportives. Vous pouvez trouver un partenaire qui partage vos objectifs et vous soutient tout au long de votre parcours.
    //       </p>
    //     </div>

    //     <div className="ktq5">
    //       <h3 className="pt-3 font-semibold text-title-faq text-white">
    //         Comment contacter le support Sidekick ?
    //       </h3>
    //       <p className="pt-2 value-text text-faq text-gray-200 fkrr1">
    //         Si vous avez des questions, vous pouvez nous envoyer un e-mail à sidekick.eip@gmail.com. Nous serons ravis de répondre à vos interrogations ou vos retours et de vous aider dans votre expérience avec Sidekick.
    //       </p>
    //     </div>
    //   </div>
    // </section>
    // )
  //}