
import Head from 'next/head'
import Link from 'next/link'
import CopyButton from '@/components/CopyBtn'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TikTokIcon,
  GitHubIcon,
  TwitterIcon,
  BiliBiliIcon

} from '@/components/SocialIcons'

import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import { ProjectList } from '@/pages/projects'






function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}



export default function Home({ articles }) {
  return (
    <>

      <Head>
        <title>
          张保林
        </title>
        <meta
          name="张保林个人网站"
          content="张保林"
        />
      </Head>
      <Container className="mt-24">
        <div className="max-w-2xl pb-24">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          张保林
          </h1>

          {/* 联系方式连接 */}
          <SocialLinks />
        </div>
        {/* 产品 */}
        <ProjectList />
        {/* <Products /> */}
      </Container>
      {/* 文章 */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            {/* <Resume /> */}
          </div>
        </div>
      </Container>
    </>
  )
}

function SocialLinks() {
  return (
    <div className="mt-6 flex gap-6">
      {/* <SocialLink
        href="https://v.douyin.com/hfLkMQV/"
        aria-label="Follow on 抖音"
        icon={TikTokIcon}
      />
      <SocialLink
        href="https://space.bilibili.com/26317883/"
        aria-label="Follow on Bilibili"
        icon={BiliBiliIcon}
      />
      <SocialLink
        href="https://github.com/liseami"
        aria-label="Follow on GitHub"
        icon={GitHubIcon}
      />
      <SocialLink
        href="https://twitter.com/liseami1"
        aria-label="Follow on Twitter"
        icon={TwitterIcon}
      /> */}
    </div>
  )
}


export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
