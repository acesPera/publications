import moment from 'moment';
import Link from 'next/link';

export default function SmallProjectEntry({ id, abstract, name, image, createdAt }) {
  console.log(id, abstract, name, image.url, createdAt);
  return (
    <div className="post-entry-2 d-flex bg-light" key={id}>
      {!!image && (
        <div className="thumbnail" style={{ backgroundImage: `url(${image.url})` }}></div>
      )}
      <div className="contents">
        {!!name && (
          <h2>
            <Link href={`/projects/${id}`}>
              <a>{name}</a>
            </Link>
          </h2>
        )}
        <div className="post-meta">
          <span className="date-read">{moment(createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
}
