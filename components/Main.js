export default function Main() {
  return (
    <section className="text-gray-600 body-font">

      <div className="max-w-5xl pt-20 pb-36 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-10">
          Ensemble, allons plus loin !
        </h1>
        <h2 className="text-2xl font-5 lh-6 ld-04 pb-11 text-slate-300 text-center">
          Sidekick c’est la fusion d’une application de nutrition et d’exercices sportifs complets avec un espace de rencontre entre passionnés pour rester motivé.
        </h2>
        <div className="text-center">
          <a
            className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-gradient-to-r from-orange-500 to-orange-700 hover:from-pink-500 border rounded-lg"
            href="/app-release.apk"
          >
            <span className="justify-center">Get for Android</span>
          </a>
          <a
            className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-gray border rounded-lg"
            href="/"
          >
            <span className="justify-center disabled">Get for iOS</span>
          </a>
        </div>
      </div>

      <div className="pt-12 pb-12 max-w-5xl mx-auto md:px-1 px-3 text-center">
        <div className="ktq4">
          <img className="h-20 w-20" src="../logo.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Decouvrir le projet
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Sidekick est une application qui met en relation deux inconnus pour qu'ils puissent s'entraider et atteindre leurs objectifs communs, que ce soit pour le sport et/ou pour un plan alimentaire.
            Le but est d'améliorer la vie de nos utilisateurs, en leur facilitant l'accés aux sports et aux programmes sportifs, et ainsi d'améliorer leur santé.
            Avec nous trouvez votre acolyte pour votre aventure sportive !
          </p>
        </div>
      </div>

      <div className=" max-w-5xl mx-auto md:px-1 px-3">
        <div className="ktq4 text-center">
          <p className="pb-8 mx-auto text-xl text-center text-gray-300 font-semibold leading-relaxed fs521 lg:w-2/3">
            La timeline du projet<br></br>
          </p>
          <div className="container flex flex-col items-center justify-center mx-auto">
            <img
              className="object-cover object-center w-3/4 mb-10 border shadow-md g327"
              alt="Timeline Image"
              src="../timetable.png"
            ></img>
          </div>
        </div>
      </div>


      <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
        <div className="ktq4 text-center">
          <h3 className="pt-3 font-semibold text-lg text-white">
            L'equipe
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Nous sommes une équipe d'étudiants français en informatique, passionnés par les nouvelles technologies,
            mais aussi, comme vous vous en doutez, par le sport ! Nous avons décidé de fonder Sidekick,
            notre propre entreprise afin d'allier nos passions.
            Pour le moment, nous sommes partout dans le monde, mais nous travaillons tous ensemble sur notre projet !
          </p>
        </div>
      </div>

      <div className="pt-12 max-w-4xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <img className="w-10" src="../Alizee.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Alizee S
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Je suis la touche graphique du groupe.
          </p>
        </div>
        <div className="ktq4">
          <img className="w-10" src="../Gregoire.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Gregoire D
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Je connais mieux la salle de sport que mon appartement, je suis le coatch sportif du groupe.
          </p>
        </div>
        <div className="ktq4">
          <img className="w-10" src="../Alex.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Alex A
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Entre deux randonnées dans les Fjords, je suis le developpeur full stack de l'equipe.
          </p>
        </div>
        <div className="ktq4">
          <img className="w-10" src="../Theo.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Theo P
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Tout ce que vous ne voyez pas, c'est moi qui l'ai construit. Mon nom est monsieur Back End.
          </p>
        </div>
      </div>


      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-9 text-2xl font-semibold text-gray-200">
              Des questions sur le projet? La page FAQ est la pour vous !
            </h1>
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/faq"
            >
              <span className="justify-center">FAQ</span>
            </a>

            <p className="pt-6 text-gray-200">
              Ou envoyer nous un email : <b className="text-orange-500">sidekick.eip@gmail.com</b>
            </p>

          </div>
        </div>
      </section>
    </section>
  );
}