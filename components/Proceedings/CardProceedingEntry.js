import moment from 'moment';
import Link from 'next/link';
import TextTruncate from 'react-text-truncate';

export default function CardProceedingEntry({
  id,
  markup,
  title,
  image,
  slug,
  createdAt
}) {
  return (
    <div className="post-entry-1" key={id}>
      {!!image && <img src={image.url} alt={image.caption} className="img-fluid" />}
      <div className="contents">
        {!!title && (
          <h2>
            <Link href={`https://aces.ce.pdn.ac.lk/publications/proceedings/${slug}`}>
              <a>{title}</a>
            </Link>
          </h2>
        )}
        {!!markup && (
          <Link href={`https://aces.ce.pdn.ac.lk/publications/proceedings/${slug}`}>
            <a>
              <TextTruncate line={4} element="p" truncateText="..." text={markup} />
            </a>
          </Link>
        )}
        <div className="post-meta">
          <span className="date-read">{moment(createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
}
