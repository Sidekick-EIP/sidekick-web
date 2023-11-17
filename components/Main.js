"use client";
import {useState} from "react";


export default function Main() {
    const [typePrez, setTypePrez] = useState('nutrition');
    return (
        <div className="w-full flex-col flex justify-center items-center">

            <div className="pt-24 gradient px-16 pb-10 w-full flex flex-row justify-center items-center">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left">
                        <h1 className="my-4 text-5xl font-bold leading-tight text-white">
                            Ensemble, allons plus loin !
                        </h1>
                        <p className="mb-8 text-white fkrr2">
                            Sidekick c’est la fusion d’une application de nutrition et d’exercices sportifs complets
                            avec un
                            espace de rencontre entre passionnés pour rester motivé.
                        </p>
                        <div className="flex">
                            <div className="flex">
                                <a href="/app-release.apk"
                                   className="lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    Get for Android
                                </a>
                            </div>
                            <div className="flex ml-5">
                                <a href="/"
                                   className="lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    Get for iOS
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="w-full md:w-1/2 py-6 text-center flex flex-row justify-center">
                        <img className="w-full md:w-4/5 z-50" src="./main-picture.png"/>
                    </div>
                </div>
            </div>


            <div className="pt-10 px-16  max-w-7xl container text-center flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl text-[#F25D29] border-b border-[#F25D29] mt-1">
                    Decouvrir le projet
                </h1>
                <p className="pt-2 value-text text-md text-orange-950 fkrr1 text-xl">
                    Avec une série de fonctionnalités sociales, Sidekick est là pour faire bouger les choses.
                </p>
            </div>

            <div
                className="pt-10 px-16  max-w-7xl container text-center flex flex-row items-center justify-center mb-20">
                <div className="w-full md:w-1/2 py-6 text-center flex flex-row justify-center">
                    {typePrez === 'nutrition' && <img className="w-full md:w-4/5 z-50" src="./nutrition.png"/>}
                    {typePrez !== 'nutrition' && <img className="w-full md:w-4/5 z-50" src="./main-picture.png"/>}
                </div>
                <div className="md:w-1/2 md:text-left">
                    <button type="button" onClick={() => setTypePrez('nutrition')}
                            className={`py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'nutrition' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                        Nutrition
                    </button>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1 mb-4"}>
                        Tempus fugit, carpe diem. In omni via, in omnibus locis, in omni tempore, ama et vive. Fortuna
                        audaces iuvat. Nil desperandum, omnia vincit amor. Veritas vos liberabit. Per aspera ad astra.
                    </p>
                    <button type="button" onClick={() => setTypePrez('communication')}
                            className={`py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'communication' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                        Communication
                    </button>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1 mb-4"}>
                        Tempus fugit, carpe diem. In omni via, in omnibus locis, in omni tempore, ama et vive. Fortuna
                        audaces iuvat. Nil desperandum, omnia vincit amor. Veritas vos liberabit. Per aspera ad astra.
                    </p>
                    <button type="button" onClick={() => setTypePrez('training')}
                            className={`py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'training' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                        Training
                    </button>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1 mb-4"}>
                        Tempus fugit, carpe diem. In omni via, in omnibus locis, in omni tempore, ama et vive. Fortuna
                        audaces iuvat. Nil desperandum, omnia vincit amor. Veritas vos liberabit. Per aspera ad astra.
                    </p>
                    <button type="button" onClick={() => setTypePrez('planning')}
                            className={`py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'planning' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                        Planning
                    </button>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1"}>
                        Tempus fugit, carpe diem. In omni via, in omnibus locis, in omni tempore, ama et vive. Fortuna
                        audaces iuvat. Nil desperandum, omnia vincit amor. Veritas vos liberabit. Per aspera ad astra.
                    </p>
                </div>
            </div>


            <div className="pt-10 px-16 text-center  max-w-7xl container flex flex-col">
                <h1 className="font-bold text-2xl text-[#F25D29] mt-1">
                    Notre Roadmap
                </h1>
                <p className="pt-2 value-text text-md text-orange-950 fkrr1 text-xl">
                    Voici notre roadmap, elle est amenée à évoluer au fil du temps.
                </p>
            </div>

            <div className="pt-10 px-16 text-center max-w-7xl container flex flex-col mb-20">

                <ol className="items-center sm:flex">
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Idéation</h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400 fkrr1">Group conception. Research of ideas.</p>
                        </div>
                    </li>
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Création</h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400 fkrr1">Creation of the project. Beginning of the development.</p>
                        </div>
                    </li>
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Beta</h3>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400 fkrr1">Core feature implemented. Usable product. Website and socials</p>
                        </div>
                    </li>
                </ol>


            </div>

            <div className="pt-10 px-16  max-w-7xl container flex flex-col">
                <h1 className="font-bold text-2xl text-[#F25D29] mt-1">
                    L'équipe
                </h1>
                <p className="pt-2 value-text text-md text-orange-950 fkrr1 text-xl">
                    Nous sommes une équipe d'étudiants français en informatique, passionnés par les nouvelles
                    technologies,
                    mais aussi, comme vous vous en doutez, par le sport ! Nous avons décidé de fonder Sidekick,
                    notre propre entreprise afin d'allier nos passions.
                    Pour le moment, nous sommes partout dans le monde, mais nous travaillons tous ensemble sur
                    notre projet !
                </p>
            </div>


            <div className="pt-10 px-16 max-w-7xl container grid grid-cols-4 gap-4 w-full mb-20">


                <div className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../Alizee.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Alizee S
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Je suis la touche graphique du groupe.
                    </p>
                </div>


                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../Gregoire.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Gregoire D
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Je connais mieux la salle de sport que mon appartement, je suis le coatch sportif du groupe.
                    </p>
                </div>


                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../Alex.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Alex A
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Entre deux randonnées dans les Fjords, je suis le developpeur full stack de l'equipe.
                    </p>
                </div>


                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../Theo.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Theo P
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Tout ce que vous ne voyez pas, c'est moi qui l'ai construit. Mon nom est monsieur Back End.
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../damien.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Damien M
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Van God, c'est moi.
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../ilian.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Ilian B
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        CEO a plein temps, je suis le chef de projet de l'equipe.
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../Theo.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Jules C
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Chat GPT pro
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-10" src="../pierre.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Pierre B
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Présent
                    </p>
                </div>


            </div>


            <div className="pt-10 px-16 max-w-7xl container text-center mb-20">
                <h1 className="mb-2 text-2xl font-semibold text-[#F25D29]">
                    Des questions sur le projet? La page FAQ est la pour vous !
                </h1>
                <p className="mb-6 pt-2 value-text text-md text-orange-950 fkrr1 text-2xl">
                    Nous somme la pour vous !
                </p>
                <a href="/faq"
                   className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    FAQ
                </a>
                <p className="pt-6 text-orange-950">
                    Ou envoyer nous un email : <b className="text-orange-500">sidekick.eip@gmail.com</b>
                </p>
            </div>


            <div className="pt-24 gradient px-16 pb-10 w-full flex flex-row justify-center items-center">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 py-6 text-center flex flex-row justify-center">
                        <img className="w-full md:w-4/5 z-50" src="./main-picture.png"/>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left">
                        <h1 className="my-4 text-5xl font-bold leading-tight text-white">
                            Rejoignez nous !
                        </h1>
                        <p className="mb-8 text-white fkrr2">
                            Ensemble, allons plus loin !
                        </p>
                        <div className="flex">
                            <div className="flex">
                                <a href="/app-release.apk"
                                   className="lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    Get for Android
                                </a>
                            </div>
                            <div className="flex ml-5">
                                <a href="/"
                                   className="lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    Get for iOS
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}