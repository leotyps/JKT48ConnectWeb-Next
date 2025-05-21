"use client"

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { useState, useEffect } from "react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const news = await jkt48Api.news(apiKey);
        setNewsData(news.news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading JKT48 news...</p>
        ) : (
          newsData.map((item) => (
            <Card key={item.id} className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <Image
                  alt="JKT48 News Category"
                  height={40}
                  radius="sm"
                  src={`https://jkt48.com${item.label}`}
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">JKT48 News</p>
                  <p className="text-small text-default-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{item.title}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href={`https://jkt48.com/news/detail/id/${item.id}?lang=id`}>
                  Read full news
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
