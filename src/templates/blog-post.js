import { graphql, Link } from "gatsby";
import { kebabCase } from "lodash";
import { parse } from "node-html-parser";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import Content, { HTMLContent } from "../components/Content";
import Layout from "../components/Layout";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const addSrcSet = (html) => {
  const breakpoints = [1500, 1000, 847, 681, 477, 200];

  const root = parse(html);
  const imagens = root.querySelectorAll("img");

  for (const img of imagens) {
    // console.log("*******************************");
    const imgSrc = img.getAttribute("src");
    // console.log("imagem src: ", imgSrc.toString());
    if (imgSrc && imgSrc.includes("res.cloudinary.com")) {
      const srcset = breakpoints.map((breack) => {
        const ff = `f_auto,q_auto,w_${breack}`;
        const res = imgSrc.replace("image/upload/", `$&${ff}/`);
        return `${res} ${breack}w`;
      });
      const gg = srcset.join(", ");

      img.setAttribute("srcset", gg);
    }
  }
  // console.log("root src: ", root.toString());
  return root.toString();
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  const htmlEdited = addSrcSet(post.html);

  return (
    <Layout>
      <BlogPostTemplate
        content={htmlEdited}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
