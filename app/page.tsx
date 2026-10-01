import TopicRow from '@/components/TopicRow';
import {getArticles, getPlannedTopics} from '@/lib/content';
import {site} from '@/lib/site';

export default function Home() {
  const articles = getArticles();
  const planned = getPlannedTopics();

  return (
    <div className="container section">
      <p className="text-muted kicker">{site.tagline}</p>

      {articles.map((a, i) => (
        <TopicRow
          key={a.slug}
          href={`/article/${a.slug}/`}
          title={a.title}
          description={a.description}
          image={a.image}
          reverse={i % 2 === 1}
        />
      ))}

      {planned.length > 0 && (
        <>
          <h3 className="planned-heading">Coming soon</h3>
          {planned.map((t, i) => (
            <TopicRow key={t.title} {...t} reverse={i % 2 === 1} />
          ))}
        </>
      )}
    </div>
  );
}
