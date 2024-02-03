"use client";
import { useState } from "react";


export default function Main() {
    const [typePrez, setTypePrez] = useState('nutrition');
    return (
        <div className="w-full flex-col flex justify-center items-center">

            <div className="pt-24 gradient px-16 pb-10 w-full flex flex-row justify-center items-center">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left">
                        <h1 className="my-4 text-2xl sm:text-5xl font-bold leading-tight text-white">
                            Ensemble, allons plus loin !
                        </h1>
                        <p className="mb-8 text-white fkrr2">
                            Sidekick c’est la fusion d’une application de nutrition et d’exercices sportifs complets
                            avec un
                            espace de rencontre entre passionnés pour rester motivé.
                        </p>
                        <div className="flex sm:flex-row flex-col">
                            <div className="flex">
                                <a href="/app-release.apk"
                                    className="flex flex-row justify-between items-center lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    <img alt="android-icon" className="w-8 h-8 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nO2YP2sUQRjGfyqI+AdLJXd2UWttUyj5AkZUbIRgYWlpoY0gnvkAFuIHCFHCIXKnIFpoF0HEj2ARQdBILhrRamTgCQzLbtjZnZk9ZH4wcOzN+zzz3ry3+85COy4D28ClFhpXpLFAh1wFDLABzDSIn1GsUUKd8lILeQXs8YwdK/Z1g9jg9IFNLeimSuQhsAZ8Vtls6/OavlvQXKNYqzEV3NKimgwb2zn7gDvAb2dhH4G7wDngFHBI4zRwHrgHfHLm2926DeztKomjwBtnQe+AMx7xZ4G3Trz9jx0hMdbwgxbwB1hsobUoDav1HjhMIuzdZSTjCTCv60vAL2BQQ+NBYe68tAzwjETccMrhgnP9p65t1dAom3vR0W2zw7U4CHyV2aOSX9ku8H4NnUHF3MfSXgcOEJHrMvoLHIugf1za1uMaEXkhk+WIHsvyeB7Rgx8tHny+41vMREziEQTb/6zqzmI71JXQBrtgNJ7I265hCJxsksRG7F9qF0zFsGvq+QitKnCkwJ7TcqdMZFTi/9RHaEtBbvYnOkikV+K/2USo7vXQmFD+OZFAmLwjBXJpBcLk0iqQSysQJpdWgVxagTChSmvn1Uy/46ax37ZpHCpoLLG+c15Pmci4xN8eMWpj39l+n9KD1ayvWE+HmEmHR90VeU+0E7OhDWJjYvv8N4l8kcFcRI8557VpNJYSvtMaxExkv5LZ2ZkYY11JWK9k+D6Bu259KsmJFMg7EopcWtNWWhPPdtt3fjKGnu227/xkVLX7Ve2273xS4rb7ddpt3/m1+AfgNeqnZPkxoAAAAABJRU5ErkJggg==" />
                                    Get for Android
                                </a>
                            </div>
                            <div className="flex sm:ml-5">
                                <a href="/"
                                    className="flex flex-row justify-between items-center lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    <img alt="apple-icon" className="w-8 h-8 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVR4nO2ae6hNaRjGf+fgyD0ZQ8nlyFHkNsMUSe5C4pAYoaaIUpqIxOSS64xLKMpxKSFyVxIhzT9OlFszzZA7f7g77vdz0FvPrq/Vttt7rX32t3d5av2x17u+dz3fXu/3rvd9vgV+kA8MArYD/wFPge7kGGwCV4EvgWMuOYICYLND/JWeyGX9XkiOTOKQCH8ClgMNZLuk85PJAcSexGOgq3O+NvBBtp/IchSL6FugY8A2UraHQFWyGJadrojsjIAtDzidK+ujWEQfATUDtt9kewY0IkfWRkng/ADgnWwTyAFcEdlx+l1TYfTJmaCFmPf4bwZ0BtoB9eNcE/vXFwBrgCfOe2SDfDTUePPTEqiSKfLDgYPA8zhv5+si3Aeo/o1rXgNbgS3AvTj2N8ARYExlZbJewL+BmxqRc8BN4GPA9s4JoUSHLfZ/9GJ8HLBZKdMjnU/hT+CznN8BpgNN41z3C7DEKTu+dVwE5gBt49yvGTBb97FrK4DVqg5Cw+J1lxzaPz5fIZMM2gOzgJ3ACWC3CMYjHw+1gGXOUz0G1Ag7kQ1yUgb0xg+GaN0YjwNhstx4Z3G69VGmkQ/scMLSQi9p1FOz474DfKAqsFc8XgCTUnWwwInLbKgMLgOFqQ4uUEo0B93wh1HicBdoHMZBXzmw3O4L1YHb4mF8QmGFHKzEH34VB0vboXFKTobhD3vFYWwUJ1ezoPW8Kw7NwzrIU0tqTn7EX8qtAMqjVMJ5Tk1lJYIPVHPUlkiIPRHrE3zhpTjEJKNQKIsan2nAGXHoF8VJrAT3qcUuEod1UZzsl5OJ+EORFryF2A9hnSzWRFbhFzvFY1tYByPk4Cx+0cRpfaeFcVBX3WCF58yFFvt7TeavMO3uSQ225so3BqsXMT7/qz+yZisp/K6BR8kOtAb+drrEqckObKA++bMySDagjjaHbCL9Uxm4SYNMiskGzBSf86kKEB008GXYDi2NqA3cFx9T+FPGPg02edMnlonHmbCid6GkT0vFP+MHRUrBxqFLFEdLnRekldiZ7k1KHfU+cnzekDMr5jKJebrvLWltkdFNjY51bQPJnFRariNtirzhD2ej31T3ykQXSbVfJHynHRvl3Haeeia4roW2DY5r86dMgkKpZKZOCcb2duTa4N5j2lDFkWrKdaPOEtRMrBgtOSnW9yc6LqjnKdJ2gU2uRNnJ7Hsqe+89X9pw7IuFeMcbfWcyFGil/cUminUTAB8kGPtRizzpwjAdhdxa7dx+UDhYYTcliQxTTdruYX31YOOvAeuBNhni/x1UJr4CHrVGKoI5TYoAAAAASUVORK5CYII=" />
                                    Get for iOS
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="w-full md:w-1/2 py-6 text-center flex flex-row justify-center">
                        <img className="w-full md:w-4/5 z-50" src="./main-picture.png" />
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
                className="pt-10 px-16 max-w-7xl container text-center flex flex-row items-center justify-center mb-20">
                <div className="w-full md:w-1/2 hidden text-center md:flex flex-row justify-center">
                    {typePrez === 'nutrition' && <img alt={"nut"} className="w-full" src="./nutrition.png" />}
                    {typePrez !== 'nutrition' && <img alt={"nutno"} className="w-full" src="./main-picture.png" />}
                </div>
                <div className="md:w-1/2 md:text-left">
                    <div className="w-full flex items-center justify-center md:justify-start">
                        <button type="button" onClick={() => setTypePrez('nutrition')}
                            className={`flex flex-row justify-start items-center py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'nutrition' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                            {typePrez !== 'nutrition' ? <img alt="nutrition-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEl0lEQVR4nO1ZXWgcVRS+VfxXtFp/0EpRY/acTduAedFgRXwQ/MO/xraZc3a1lTwIUiuCYtUqCNoHH1QEpfhQBR/9QYsvYmm1FAMtouiDVKQPWmNtds/ZJP70Z+TM3Nksa3Z3NskmE8gH8zBn7rlzvrn33PudO84tYhHZhTDuFsbvxqint1m7cJs7TQp4hzDuEIZvheF3IfxLCL5yWYAQ7FHGUAnGhfHOKdsw3K0Eh6J2/7tg1GUB4UD+TCF8a5IM3FT7XBhfrAZNcCi6D3CNMDzp7ftdlqAE2ywwYRjRDd3LzCYMT3jbP0KwJRxwpyfthfGd6BnhSy5LCJ1bIgwfxYHjjspgbpUwHLdLC3B/bdsjtPo8JThmbUsB3OCyhomHe64Wwr+F4F9lGI6nE75W3y4ZKWU84LIKZfygJieOHd2Yu6D2eZnyXcpQiZ7XjVTHocVuUIKnhfBLZfhJGcaipZPxN/uqQvB2JcCHwoHl51QY1yVEbIpVbQTv+lGSSaL4ixJ+qgzPl6j7mo4SEIKPp142p15KjVTN/edKUErjK4QnlWBXudBz3eySINwUz/UooDFl3KkMDwhDtyVr+HjXWfpI16VCuX6b87axNQ4S9kiAm21pNh/ztT6sL6Xcg0rwnn+HjeKEEgzNDgnGrTWB7Bxfn7sylV+Aa5Tx59p9Qzl/cxrf8cL1VynB+57MKSF8aqYk7vUdnbSv2K5/eXDV0jgXYLhU7L2oXX8h2BJNsziH7nPTwVgxf4XNcz+dnnHzBPUzQgj/qNDqy9ruQBi2+534CxN5bp4QmsBk3O1j2d6W8+jAtRcqoUbOAdzo5hlCuX6fZ6X6vagpbEXySbrPZQTKuD/eOPNrUztVFSzjVpcRKMMLPqY323GKtVHK5XIuoAW8xS88w+mdCA6bkwk/lxGMDuIKnyeHUztZUWROpo1cRvDrUN+5yW6f2slEYESkuOJslxGEJoN8YZbYWipmIThiTpX1Ky93GYFu6F6WlANVG2PZ9FpDJyH4MSJCsNJlBGPU0+un1veJrWV5LIQfRkQY17mMQAv5tX7V+qRqi9X0wdaHBwQvu4xACF+p131eTGpjJzt7iofta5cRKOO+OKZcv92bVElKhIZOcaGDE8J4orwpf7HLQKKLncAQjNvZmdkqlL+tJZHIOaqfo+TaOFcBN4wlgEdNxls9X7UxfpaKiDAU/XL3jcsYlPC52vK5aWPbDKOTQsawXIQ+N88YGcif76dTNBLVyrEVEYOt0X5UdqVNxjm5CEoSwF2pidiumRzhVILcrS2IzA2JAJ8Vhktq39mSSDQqAW72GueHZiKyUaedtGs7RMKhvjOMhB/SNxYskUTn+H3llB2HuoVKJDltTGR0uQC3u4VKxKAMryf6pp5Mo07t+FQY9maKSOjcEssTPzLHleGx6XY6U+JHvdZqq2KsJyOMr1q+1HbcLpFGAadtX/Faq6mMT9dx7h4l/HPGwzxN6OQOP/P/juNB1/L5IKJVrQWjs16Od5rISL3WYjxhJ6Kz/qI5kygca62OkDA0+0s1OxfYX6wDkZBtdnKyiEW4juA/dBAiL1bBDfkAAAAASUVORK5CYII=" />
                                : <img alt="nutrition-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADd0lEQVR4nO2ZS0hVURSGt0Y+MumlFZVEFNGgEGpSUhENgl6UJjoMKho0MSMoMishKAcNKoJCGlTQsAcpTaIoE0kooqhBGOGkF6llZpnZFwvXwc3t3nPPud573YI/3MFZZ/37/P/dZ++99j7GjGMc7gJ4ALwAiuPkZQIbgQbgOfAR+Ak0GxcAPGQIP4BNMXK2AO1ER5dxAUAWcMEysyri/glLdLterwEOaKzVuATguAr7BBRobL/G+oFqYIKVf0nv1RmXAGQAN1WcjINlwID+SiNy84BOzV1uXANQBPwCfgNtKvRMlDyvp54aVwFct8aE/Ov5EfcXAd/1fmm6xS0BDgH3gTdAr06d7+VfBS4CFUAuUGkZabBil7WXvln33wF3gFpgQaoN3IoxbUadStWUh7tAd0DuINAELEy2id36rqM9cAUoAxbrYM0GCoESfeebfUTKWlMlU7NysrUNaWsHcFWfIegD9ibLRI0lQgzMCciT9eFtxLqxOiB3LnBNeX+BgyM1sU0bkq6uSoA/TceC/KYmwK/WZwu2h+V7jczW91xw2IwSGH4jPgMzE2mgXhu4J0VeSlQG05GpxaigPix5CtCj5JUpUxlcT4lq6Y5ci+IRZUYStBhHALSqpvIwJK+CrTGOADimms6HIXm1UaDpMh0A1qqmtjCkDiUVGUcAzFdNHWFIsikS5BpHAEzyVvswJCkCBTnGETBUygj6rZh/xQx8UNIs4wiAAtXUacW+Sr3mR3qtpKXGEQDFqumlFfPfHgM3NKnSOAKgXDXdtmKCZ0EOD04aRwCciqz79LrHjyRnT4LHxhEALaqpRK/z9Ro/Up5uav4A09Mp2GegD+iykKWx9XGNaKLsnwW70iXYR8seLeNrrVhjUCM7Ne+JcQzAUc9EECM5elIoWJE2lbH1TNbXyeuJwUBGlFynuU0hBmM60A1sDmOk0DrCWRcnN104AsywnxnXiCbL0Y3glV8RGavRVMYJaWSimhCcG7NGrDqnT4+GKsxYNWKdNnrfNzaYsWpEAJxVbk+kGR8Bcnz6yDUjGTJOlC8lw75EGx2pcYZrreA7xihmTut4YQRGogoOms9wrRW7jA/Y8Fbgy4i7OfHnNybtuyMwbzSMMFxrdSV9O55qI/xfa8kWoywVD0onulNiQo34faVKBnr1G2Wd78nJOMZhUoJ/Px2lv2jm8eUAAAAASUVORK5CYII=" />}
                            Nutrition
                        </button>
                    </div>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1 mb-4"}>
                        Le module de nutrition de cette application web sportive est comme un chef personnel virtuel pour ton bien-être physique. Il te permet de suivre ton alimentation de près, en enregistrant ce que tu manges et en fournissant des analyses nutritionnelles. Que tu cherches à perdre du poids, à gagner en muscle ou simplement à adopter une alimentation plus équilibrée, ce module t'accompagne avec des conseils personnalisés et des recommandations adaptées à tes objectifs. Avec une interface conviviale, tu peux planifier tes repas, explorer des recettes saines, et rester motivé pour atteindre tes meilleurs résultats. C'est comme avoir un nutritionniste dans ta poche !
                    </p>
                    <div className="w-full flex items-center justify-center md:justify-start">
                        <button type="button" onClick={() => setTypePrez('communication')}
                            className={`flex flex-row justify-start items-center py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'communication' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                            {typePrez !== 'communication' ? <img alt="communication-icon" className="w-6 h-6 mr-2"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF40lEQVR4nO1ZaWgdVRS+GrVqraK1VqW1WF8z58xLgxrXKgZcUCmKog+TzLkvXaAqEv1XreKCiEoVXOgP9+2H4oIL4g+x1VqlInWtYKkrtdZaU5O5d/JStWlHzp07LzF9ycvrzOQF6QcDSWZy7j3nnu07V4h92IeJg+1e7vBAugUt4WFFuFpJ2KwJtZYYagl9SuIWJWGNkrjC96Dd75h7pJhI0EU8TxG8qgh3RJse26Mk/K0I3gwkXlhXBYJiY7OSsLK8McJdmnCdknivKuKlQYczt6/TPTZsbT0gaGuaHhA0+QQXKYl3acK1SuLAEKXW+J3QMq4KhELspyXexha1bhNowgdLbc7xtcjRC3PTFME9WqJvldmpCO8OC6JBZI2wMOMQJeGNwVOAx5SEqUlk9hRmH6EJH1ISdxu5BO9spebJIiuEnbMOHnQl6NHkXJWmfOXBfCWx2xrowy1LWg4VGbnTi5HFcDv7e+qLsDLtOEdJ2GZd7WVeV6QJXXSvLadRcuaJjJOIOfHIfa9LT3Bb0/S4HiiCohgH+NLpsKevef1UhHKBs+l1daWjrqV2jPRUWldJWGW94JHESnQvcqbEp9Er8ZTKimajSF+ne3J8Kt2LnCmpHLGS8JWoA5TE9bx+QNCWSJAmfM4e7y2p7a6m9WGZXf+ZRIL4JFiQX3TPSG13ta1/tnW/zxMJ0gS9RpHF7lEjfpNRjFhFptpq/2ciRbj/YUHc+NVDkXBJy4FxH5ZIEU1QYkGZtAtjrWEyakwTCdKEPxvXIjcn6oBeD061p/ZjIkHciRpBRfdqUQeoIpKtJW+b3wnP1BLuCKj5mJoEacKlkY/ikyN+k1I8VFQkpgyE10f7gZvtfvqZoDGtGKugRsMTCHpH4ghZKaLbG49m+qwkDsT9li+d05geD3IX3BgUMT9WZSIO4uGtYhzBQwob6G/t8Y6ceXHV50TAFLqqQObSER+HUi81nijGAdxnGepr0n8eRyJ6WuLzts6UdGfjOVUFK8InbD5fybldZAgeWGiCTXaDj472LXfjTLdtd/7raIV7sMIS/GAD7aXwTrG/yACcjTThZ3ZjH4dduUnV/of3wtTYGvqpMdLQiFNrgqfTpqE8PorrljHawtw0/rsmWFItWfjF/EmK4B9+ejpwVnVlPJhvrfVHWgpw18BjoPKAj3BtnKW0hFbe3FiyniZ4wRphWdVFeZ5lFXk9qQJ9HhzHmVAR/GJddjfXKw7ivZGnCa+wcj4Y9UM+vngoEJB7fqVvthXcwxQ5C9iSHLRsbR64Gd+XeeQJpLG+hFVxQ2pPYZ3y4CyRAP0L8jNtnGweWVvPdbWE763Grw1/zxsOCG7gQXVNs18Jr3ANSCN5bKXmybau9O2pwMLcNCb/sf9ydhjKn9nKWsID5SRgSZCW+ImZTxGUuDLzz4rgWz52JfF+5bmXD51QmuGfhzcpCb/vNXdpxzlxotjz5WBa26kJlnPLwtNzM6gm+OI/ixCu4+ljLdlMdzaCIrxPSfwtMQkj5zJr7PcqvMQNo7sH9kfV1T136P/xqZW83IxMZ7jDwPXNGnTp8HfC9/KnczrkkYzJ09HlDV8JrGALcHCPUp1LprWR0CoyRv+C/Mwo5nCg1luBqmCXsT67qUe6J4iMEJrKju9bL3k2/QUK7kHmNONK7blu6osIUwiX29jYWrXX2luwiymCL+MOVRHemFbTGRZEQ7mZJdwReHiByBIc+EMvh/h0WKGk1lOWr7ASPrmXiPEC8/5ye16+DMXVzMF1Ea5kpse1hWsKp3C+9VWe43BSqTTF0YSLrSIbEs+Ga4W5GJV4TVQYh7Qo1R7Cd4crwy0+F1lbBtZzhhX1AFuclTLBytMawo1c2c1ggfAvDl6zUYqmnWz54ZSWs2FZGcJdSuLjmQV8UqiIB31TdknCr7WE2zkumHqzQXjIHdUsE4OfiomKsCs3yZduFw/qqrsifCcmOsKCaPClc7FpPAk+Yi4TzbjMnf9PXBD9jjmz673Pffjf41+TrK/bAZlAnAAAAABJRU5ErkJggg==" />
                                : <img alt="communication-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjklEQVR4nO2Ze2hWZRzHT877LeZ0U+lCLTXzQqZ2sUgopSKKQqOSkCAoJdL/lhaJiJRYUIZ/pJZd/ijKKCX6IyovJUbUbCUk2ip0qVnpZHNbNvMjv73fA0/b+573nJ3nbCP2hRf27jzn+31+z+V3e4OgF73oOQCGA/cBLwE7gTqggRxOA0eAL4D1wINAadCTANwMbAFaSIYzwFZgTncbMBX4zJnYv8A3wLPAHcAUYDTQF6gAJgNzgZXAHuCs867t1PSuNuAC4GmtqKEReAEYm5BnFLAaOCWeVmAVUJLd7AVgEPChs5KvAGVBCgAXAi8C58T5MTAkDWckgIHOUToJzAs8ArgT+FP8u4DBPvnd4/S2RP6y8x5kAGAccFw675pu4FngMceNzvJKnt+J2I4bFvkkrnDiwUJvxNGaC6RnuhW+SC3AoSDXYavxgAK6n+vxOh9GDHN2Y1qBMVkZcrUeN9g8fG1xTSqizuv/IP0H0hK9IaJl3maXTH+59DenJaoR0bXeZpdM/wbpV6clqhfRiIgxmdwRcZdpyIm0hlj+Y+jbTYb005DWtIY0ich/uhA/hhka0xL92kYDV3ibXTL9a6T/c1oiy0QN873NLpn+Q9L/SN+vA1YA5UmJqkS0KWJMIiTUD0uGxfr+pL43q0AbFJdovOqE+kI1QlaGACNVPp8N8y1ghsrjsHY5AEyKSxjWIE8FXQg1KQzb8jyb5UR9q1DnxiGcrnrcPNhlWU08T57Vqs/EiELvTRljc7sxDvFGvWC70y+LyTta1rA4JL2XYxR8Vm4bfosK3G6ErdUL7wB9fBsgnXLgW+nsBgbEeKePSmPDq3HL0LCmfs13Gar2URi3bNFG6f+PFnMWQCXwjz6Xxm0QGP7waMBgtYHCBt8ex0vN1uSKej3gLQ1ZHkfU+lmGDzwYMMY8IXBYnOZSN9kl7iTfPeLZUWxgpdMUuKXAmKHAw1rJ0VrtEp39iepArlIZGyakqEN5fWcMCAFcLK66oBCAq4CfNPD9PM9two+rUR0X1ql8T23U1M4DGCLe04Xamuuc87vLrZ+1ys87TsBQDXyl/lSTIrP9/aNtO7AGuNvtUComLAV+L2Z9EO2MDLX5HoZuzY7BWqUsc9So3ttOw47HvCTeDLgSeA44Gncbg8Jcd2nIp/ke7i/C26zoelOe7stFmfZw20HxzVCV7+FMucMGucE6fV+vFRgaEZ2blNrMDjIGuYt+Rsd4rG9yOzIo3bjEK3nHyL5dWq8HvgH01+61XUDzfN5FgjYdu7uGY0VzrRQidsS+k5AdtSW+kk5y8SlMZs2r3uqDN0pwWLsfh2pl0AhP9UoLcLu/GRcXnu+k5+hy7lQNfq9VesqyByo9LwUmyKl06OIAj4hnf+recCeMsR9G71dgdFOUYvikvTGW4ivIompxZpca40ykVEatVbfmgCK7xaa/dXltovXOyv+npDVv6Bhjrn5DZhc+LcilHvuc3fkeeMbuhZXeWpDNMsTwddBTQe4YPWGNuhjH8GDQ00HO5d6mxPNL1TLNchy/WEAELu/uefbif4/zfOq6jb24SJIAAAAASUVORK5CYII=" />}
                            Communication
                        </button>
                    </div>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1 mb-4"}>
                        Le module de communication (chat) de cette appli sportive est là pour te connecter et t'inspirer. Imagine un espace où tu peux échanger des conseils, des succès et même quelques défis amicaux avec d'autres passionnés de sport. Que tu cherches un partenaire d'entraînement, des astuces de motivation ou simplement à partager tes exploits, ce chat te permet de tisser des liens au sein d'une communauté qui partage ta passion. C'est comme avoir une salle de sport virtuelle pleine d'amis pour te soutenir à chaque étape de ton parcours sportif.
                    </p>
                    <div className="w-full flex items-center justify-center md:justify-start">
                        <button type="button" onClick={() => setTypePrez('training')}
                            className={`flex flex-row justify-start items-center py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'training' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                            {typePrez !== 'training' ? <img alt="training-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,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" />
                                : <img alt="training-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEgUlEQVR4nO2Za4hVVRTH96gzTUWT9hoUysosIjTtnWQvijIoJMjASnuhhiThh+pTDwvSD4X5KKMkhTKRokLSrIxIIxN6oNODsuwFPaymp9pY/WI1/y3b0zn3nnvPPtMN7v/LzH6stdfe+6y1/ntd55pooom6AJwAPAJ8CvQA7wG3Afu4/wOAduBB4E/S8aFt0jUygEOAjTJ4FzAfGAEMAM4AujS2A5jsGhHAwcD7MvQbYEzKnL2BRcHtzHUN+Dmtl3GbgaFV5l8J/Kb501yjALhdRm2xzyunzKVexjUCgIOAn+XcuZ0YuEQb2e4aAcD1MmhFDTKDgecktzDigU4ClgObgK8U9r8ENgD3AKMqKXhSBl2RMnaYfGdN0NeiRZCfDCm4gYHAHLtZ8mElcHiaIh+pjkr0jwW2BQpOAc4Dtqr9NXBawU2M1ImjT3slMEUhvxNotYOSLfcG9vwCnJNU9q0GByX6vcFvp5yKjY0tuAk7mJ+k71XblKsucyDwuPdN4Mxw0BKfYUBC6Dv1DwVmKrf8AMwD9iq4iQOAz6T/MaCtBtkWYIFkTUeHH7AsbWhPCDyj/huKGJ1hjDEG5H+tdcj3B16Xjvt8Z7c6BiYmX65+I4v9I9Mg+yz+AIYX0HO87LPPs8OJ3ZKMBHI0I4iGa/7LcJ8F4OXd9gFvqfGvZBjcivnLYBcByhOGiRF03ShdS6zxohrnZ0x+VuMv1PM9p+h7U/qOjKBrtHR1WWOJGtdmTO4MEqCFvn5VlPcDLgIWi4B2KzJ+rtv4Ubr2jcQGDNusccc//8KsCgKjAgPs0dWSMe8k4B1yoOgmAj829FjjajWWugqw5BPQiHkp4xcDOzX+LjADOFWZuU1/J4pHrXURQG+CNHxvjbPVWJdD0D6Z3zV/RtA/LMjSC5LJtSwAZ2nNDT7L/iX+UjVfAJeJF/V4WgG8JIWP9sUGPICHte4c3/GROka4HBBbNbwGHKv/u3fThT4AvU+J7bqE43znMhlzXU4lbYFTb+zr9zu9xZBXtO7ycOAmdS6qQdm5iUA0rizDUwog/g31yR6s3SomGtjs6qMIhiNcyQBODJiIsY3RafHYR51Da1BsIZdYCa4CbbeDfkJEE/n00VkC/rqmpE7IzuJrw6dwCZtYFxyWOfedFcu2xiA1ebVrEACnBxHxLqsh5BEapGS3K29tq2wA92sjs2sV9Ex3emnW5belI+B3I2sVniDBrixi2FcAbpYt6+sRbg1ejONLsTCfHZ3BbVxYr5LpUvBxWSE1hw1LZcPzRdO/r2XNj2phvvUnBaF2WIyf3TxdvyqaldXXHRO8aeIEHGCqFO7Ies/HBHByUBJdHFv53KBYfUFU5XuuMxn4VWs9Ff1hJorwkBYwnjMzsn6rgqwKKMjCmMXAtM3MDhZbpnrwOD1rN+mHIjvRD6zwBtyqH4KOUShtF/0eoufpLcAbgU5jshNK2UCV648F28DdyXJt6VCR4Wn5jN3ELPuNBNgP2F/loGnAA2LFW+TAOxVOv1Dx2XxvfC1V+CaaaMIVwt/1ITNsvhzjJAAAAABJRU5ErkJggg==" />}
                            Training
                        </button>
                    </div>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1 mb-4"}>

                        Le module d'entraînement de cette appli web sportive est ton coach virtuel dédié. Il te propose des programmes personnalisés en fonction de tes objectifs, que ce soit pour perdre du poids, gagner en force ou améliorer ta condition physique générale. Avec des vidéos d'exercices, des séances interactives et des rappels amicaux, ce module te guide à travers chaque étape de ton entraînement. De plus, il t'offre un espace de suivi pour enregistrer tes progrès et ajuster tes routines. C'est comme avoir un expert en fitness à portée de clic, prêt à te motiver et à te pousser vers tes meilleures performances.
                    </p>
                    <div className="w-full flex items-center justify-center md:justify-start">
                        <button type="button" onClick={() => setTypePrez('planning')}
                            className={`flex flex-row justify-start items-center py-1 px-2.5 text-xl font-bold p-1 ${typePrez === 'planning' ? "bg-[#F25D29] text-white" : "text-[#F25D29] bg-white"} rounded-full hover:bg-[#F25D29] hover:text-white`}>
                            {typePrez !== 'planning' ? <img alt="planning-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFklEQVR4nO2Zaw7CIBCE19vAneCmRqNNvQ/zXzHWR2pjW7QgbNkv2aTJJoUJMxRSIkEQJoHVLaz2nMsZ1VAJE4lR9HoYXzEefZQyERGiZUXeEGulygiYF61OCDEFqxcCo09zy+isOvZe1HZnnfGBUvf9ZyGhnnxwG6QvbEjqPj4J8USbOavdV0RfqBDwi5Bnn5UQTGXE6HPxGXFGNd+EvciMcATVCcGMR51V29zHE4QICfVo7qKl1sptTVQnBIH7OPuMOKv3uUWgqu23dBAxI7n7Pk5G5KwVB6w+I8jwv8QZdch2Z0fs70Ds+wj+bLWl46EaISjEWkh5Z48fdr0bm6iTOzszMLQW96IcmYieMTv+nREEgTquKgdpqXP/0KcAAAAASUVORK5CYII=" />
                                : <img alt="planning-icon" className="w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA9UlEQVR4nO2Z6w6CMAyF6/u/ktHIgm+lxxjMsii7yAZtt36/SrqxHdpCF4gMw0gCYIZ+3FtIF5A34hHT4YeUjZiQBTlP1CKy0F9EtEPoBPKGUtC9EAD3gkhOX72aSyy0tz8qpIhgvAuFrSy0t/9XCIBTeJ2Y+CQhYIuQwK9HSIaHhhpxfxa7vBrRCIYTgnyOniEA8kZljnJD3thI7fxaMJwQFL7He6iRKwRA3lAKhhMC/l5q3tRrrQzk7qWc9VqaQCy1mP6X3NjO7K1pXiPI3Lg1tethGCFHw3Vmb80lsVFn3xFN4IOY80QtxFQTrZm4M8MwSDgvXairw9FbkRgAAAAASUVORK5CYII=" />}
                            Planning
                        </button>
                    </div>
                    <p className={"text-xl px-2.5 text-orange-950 fkrr1"}>
                        Le module de planning de cette appli sportive est ton organisateur ultime pour une vie active et équilibrée. Il te permet de créer des plannings d'entraînement personnalisés en fonction de tes disponibilités, de définir des objectifs hebdomadaires et de suivre tes sessions sportives. Que tu préfères des entraînements matinaux revigorants ou des sessions après le travail, ce module s'adapte à ton emploi du temps. De plus, il peut intégrer des rappels pour t'aider à rester discipliné. C'est comme avoir un agenda virtuel dédié à ton bien-être, te permettant de maximiser ton temps et d'atteindre tes objectifs sans compromis.
                    </p>
                </div>
            </div >


            <div className="pt-10 hidden px-16 text-center  max-w-7xl container md:flex flex-col">
                <h1 className="font-bold text-2xl text-[#F25D29] mt-1">
                    Notre Roadmap
                </h1>
                <p className="pt-2 value-text text-md text-orange-950 fkrr1 text-xl">
                    Voici notre roadmap, elle est amenée à évoluer au fil du temps.
                </p>
            </div>

            <div className="pt-10 px-16 text-center max-w-7xl container hidden md:flex flex-col mb-20">

                <ol className="items-center sm:flex">
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
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
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
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
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
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

            <div className="pt-10 px-16 text-center max-w-7xl container flex flex-col">
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


            <div className="pt-10 px-16 max-w-7xl container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-20">


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
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../Gregoire.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Gregoire D
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Je connais mieux la salle de sport que mon appartement, je suis le coatch sportif du groupe.
                    </p>
                </div>


                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../Alex.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Alex A
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Entre deux randonnées dans les Fjords, je suis le developpeur full stack de l'equipe.
                    </p>
                </div>


                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../Theo.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Theo P
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        J'ai fait tout ce que vous ne voyez pas, sur toutes les applications du projet.
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../damien.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Damien M
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Van God, c'est moi.
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../ilian.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Ilian B
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        CEO a plein temps, je suis le chef de projet de l'equipe.
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../Theo.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Jules C
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Chat GPT pro
                    </p>
                </div>

                <div
                    className="grid p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img className="w-10" src="../pierre.png"></img>
                    <h3 className="pt-3 font-semibold text-lg">
                        Pierre B
                    </h3>
                    <p className="pt-2 value-text text-md fkrr1">
                        Présent
                    </p>
                </div>


            </div>


            <div className="pt-10 px-16 max-w-7xl container text-center mb-20 flex flex-col items-center">
                <h1 className="mb-2 text-2xl font-semibold text-[#F25D29]">
                    Des questions sur le projet?
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
                        <img className="w-full md:w-4/5 z-50" src="./main-picture.png" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left">
                        <h1 className="my-4 text-2xl md:text-5xl font-bold leading-tight text-white">
                            Rejoignez nous !
                        </h1>
                        <p className="mb-8 text-white fkrr2">
                            Ensemble, allons plus loin !
                        </p>
                        <div className="flex sm:flex-row flex-col">
                            <div className="flex">
                                <a href="/app-release.apk"
                                    className="flex flex-row justify-between items-center lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    <img alt="android-icon" className="w-8 h-8 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nO2YP2sUQRjGfyqI+AdLJXd2UWttUyj5AkZUbIRgYWlpoY0gnvkAFuIHCFHCIXKnIFpoF0HEj2ARQdBILhrRamTgCQzLbtjZnZk9ZH4wcOzN+zzz3ry3+85COy4D28ClFhpXpLFAh1wFDLABzDSIn1GsUUKd8lILeQXs8YwdK/Z1g9jg9IFNLeimSuQhsAZ8Vtls6/OavlvQXKNYqzEV3NKimgwb2zn7gDvAb2dhH4G7wDngFHBI4zRwHrgHfHLm2926DeztKomjwBtnQe+AMx7xZ4G3Trz9jx0hMdbwgxbwB1hsobUoDav1HjhMIuzdZSTjCTCv60vAL2BQQ+NBYe68tAzwjETccMrhgnP9p65t1dAom3vR0W2zw7U4CHyV2aOSX9ku8H4NnUHF3MfSXgcOEJHrMvoLHIugf1za1uMaEXkhk+WIHsvyeB7Rgx8tHny+41vMREziEQTb/6zqzmI71JXQBrtgNJ7I265hCJxsksRG7F9qF0zFsGvq+QitKnCkwJ7TcqdMZFTi/9RHaEtBbvYnOkikV+K/2USo7vXQmFD+OZFAmLwjBXJpBcLk0iqQSysQJpdWgVxagTChSmvn1Uy/46ax37ZpHCpoLLG+c15Pmci4xN8eMWpj39l+n9KD1ayvWE+HmEmHR90VeU+0E7OhDWJjYvv8N4l8kcFcRI8557VpNJYSvtMaxExkv5LZ2ZkYY11JWK9k+D6Bu259KsmJFMg7EopcWtNWWhPPdtt3fjKGnu227/xkVLX7Ve2273xS4rb7ddpt3/m1+AfgNeqnZPkxoAAAAABJRU5ErkJggg==" />
                                    Get for Android
                                </a>
                            </div>
                            <div className="flex sm:ml-5">
                                <a href="/"
                                    className="flex flex-row justify-between items-center lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                    <img alt="apple-icon" className="w-8 h-8 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVR4nO2ae6hNaRjGf+fgyD0ZQ8nlyFHkNsMUSe5C4pAYoaaIUpqIxOSS64xLKMpxKSFyVxIhzT9OlFszzZA7f7g77vdz0FvPrq/Vttt7rX32t3d5av2x17u+dz3fXu/3rvd9vgV+kA8MArYD/wFPge7kGGwCV4EvgWMuOYICYLND/JWeyGX9XkiOTOKQCH8ClgMNZLuk85PJAcSexGOgq3O+NvBBtp/IchSL6FugY8A2UraHQFWyGJadrojsjIAtDzidK+ujWEQfATUDtt9kewY0IkfWRkng/ADgnWwTyAFcEdlx+l1TYfTJmaCFmPf4bwZ0BtoB9eNcE/vXFwBrgCfOe2SDfDTUePPTEqiSKfLDgYPA8zhv5+si3Aeo/o1rXgNbgS3AvTj2N8ARYExlZbJewL+BmxqRc8BN4GPA9s4JoUSHLfZ/9GJ8HLBZKdMjnU/hT+CznN8BpgNN41z3C7DEKTu+dVwE5gBt49yvGTBb97FrK4DVqg5Cw+J1lxzaPz5fIZMM2gOzgJ3ACWC3CMYjHw+1gGXOUz0G1Ag7kQ1yUgb0xg+GaN0YjwNhstx4Z3G69VGmkQ/scMLSQi9p1FOz474DfKAqsFc8XgCTUnWwwInLbKgMLgOFqQ4uUEo0B93wh1HicBdoHMZBXzmw3O4L1YHb4mF8QmGFHKzEH34VB0vboXFKTobhD3vFYWwUJ1ezoPW8Kw7NwzrIU0tqTn7EX8qtAMqjVMJ5Tk1lJYIPVHPUlkiIPRHrE3zhpTjEJKNQKIsan2nAGXHoF8VJrAT3qcUuEod1UZzsl5OJ+EORFryF2A9hnSzWRFbhFzvFY1tYByPk4Cx+0cRpfaeFcVBX3WCF58yFFvt7TeavMO3uSQ225so3BqsXMT7/qz+yZisp/K6BR8kOtAb+drrEqckObKA++bMySDagjjaHbCL9Uxm4SYNMiskGzBSf86kKEB008GXYDi2NqA3cFx9T+FPGPg02edMnlonHmbCid6GkT0vFP+MHRUrBxqFLFEdLnRekldiZ7k1KHfU+cnzekDMr5jKJebrvLWltkdFNjY51bQPJnFRariNtirzhD2ej31T3ykQXSbVfJHynHRvl3Haeeia4roW2DY5r86dMgkKpZKZOCcb2duTa4N5j2lDFkWrKdaPOEtRMrBgtOSnW9yc6LqjnKdJ2gU2uRNnJ7Hsqe+89X9pw7IuFeMcbfWcyFGil/cUminUTAB8kGPtRizzpwjAdhdxa7dx+UDhYYTcliQxTTdruYX31YOOvAeuBNhni/x1UJr4CHrVGKoI5TYoAAAAASUVORK5CYII=" />
                                    Get for iOS
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}