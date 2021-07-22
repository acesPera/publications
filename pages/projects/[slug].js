import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import ErrorPage from 'next/error';
import { getAllProjectSlugs, getProjectBySlug } from '../../lib/api';
import Layout from '../../components/Layout/Layout';
import SingleProjectEntry from '../../components/Projects/SingleProjectEntry';
import ReactMarkdown from 'react-markdown';

const Details = ({ project }) => {
  console.log(project);
  const router = useRouter();

  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return (
      <Layout>
        <div className="site-section" style={{ paddingBottom: '1rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="section-title">
                  <h2>Loading ...</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={project.ProjectName}>
      <div className="site-section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
              <SingleProjectEntry
                id={project.id}
                name={project.ProjectName}
                image={project.ProjectImage1}
                slug={project.slug}
                authors={project.authors}
                supervisors={project.supervisors}
                createdAt={project.createdAt}
              />
            </div> */}
            <div className="col-lg-12">
              <div className="section-title">
                {/* <span className="caption d-block small">Categories</span> */}
                <h2>{project.ProjectName}</h2>
              </div>
              <div className="post-entry-2 d-flex">
                <img
                  width="100%"
                  height="100%"
                  src={project.ProjectImage1.url}
                  alt="Image"
                  className="thumbnail order-md-1 mr-5"
                />
                <div className="contents order-md-2 pl-0 pt-0">
                  <h2>Supervisors</h2>
                  <div className="col-lg-6">
                    <div className="post-entry-2 d-flex">
                      {project.supervisors.map((supervisor) => (
                        <div className="col-md-8" key={supervisor.id}>
                          <div className="post-entry-1">
                            <img
                              width="70"
                              height="70"
                              src={supervisor.SupervisorImage.url}
                              alt="Image"
                              className="img-fluid"
                            />
                            <h2>
                              <a href="blog-single.html">{supervisor.SupervisorName}</a>
                            </h2>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <h2>Authors</h2>
                  <div className="col-lg-6">
                    <div className="post-entry-2 d-flex">
                      {project.authors.map((author) => (
                        <div className="col-md-8" key={author.id}>
                          <div className="post-entry-1">
                            <img
                              width="70"
                              height="70"
                              src={author.AuthorImage.url}
                              alt="Image"
                              className="img-fluid"
                            />
                            <h2>
                              <a href="blog-single.html">{author.AuthorName}</a>
                            </h2>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg">
                {!!project.Abstract && <ReactMarkdown>{project.Abstract}</ReactMarkdown>}
              </div>
              <div></div>
            </div>
            <div className="row">
              <div className="col mr-5">
                <p>
                  <a href={project.ProjectPortfolioLink} class="more">
                    More Information<span class="icon-keyboard_arrow_right"></span>
                  </a>
                </p>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <p>
                  <a href={project.GithubRepoLink} class="more">
                    GitHub Repository <span class="icon-keyboard_arrow_right"></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const data = await getProjectBySlug(params.slug);
  // console.log(data);
  return {
    props: {
      project: data
    }
  };
}

export async function getStaticPaths() {
  const slugs = await getAllProjectSlugs();
  return {
    paths: slugs?.map((slug) => `/projects/${slug}`) || [],
    fallback: false
  };
}

export default Details;
