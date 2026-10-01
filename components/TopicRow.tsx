import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  reverse?: boolean;
};

/** Card on the home page; `href` makes it a link, without it the topic is shown as planned. */
export default function TopicRow({title, description, image, href, reverse}: Props) {
  const body = (
    <>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element -- small static thumbnails
        <img src={image} alt="" className="topic-img" loading="lazy" />
      )}
      <div className="topic-text">
        <h2>{title}</h2>
        <p className="text-muted">{description}</p>
      </div>
    </>
  );
  const className = `topic-row${reverse ? ' reverse' : ''}`;

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={`${className} planned`}>{body}</div>
  );
}
