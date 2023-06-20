"use client";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const handleDownload = () => {
    const fileURL = "/app-release.apk";

    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "app-release.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <Header />
      <div className="container-sm">
        <div className={""}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Welcome at <span className="text-color-primary">Sidekick</span>
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Sidekick is an application that connects two strangers so that
                they can pull each other up and achieve their common goals,
                whether it's for sports and/or for a food plan.
              </p>
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                The aim is to improve the lives of our users, to make it easier
                for them to access sports and sports programs, and thus improve
                their health.
              </p>
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                With us find your sidekick for your sport adventure!
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <div>
                  <a
                    onClick={handleDownload}
                    color="mobile"
                    href="https://apps.apple.com/us/app/apple-store/id375380948"
                  >
                    Get for IOS
                  </a>
                  <a
                    onClick={handleDownload}
                    color="mobile"
                    href="https://play.google.com/store/games"
                  >
                    Get for Android
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
