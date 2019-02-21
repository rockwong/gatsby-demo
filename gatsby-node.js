/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const _ = require(`lodash`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  console.log('node.internal.type==', node.internal.type);
  const { createNodeField } = actions;
  const tags = _.get(node, 'frontmatter.tags', []);
  console.log('tags==', tags);
  if (node.internal.type === `MarkdownRemark` && tags.some(tag => tag.includes('Notebooks'))) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
    });

    console.log('slug==');
    console.log('tags==', tags);
    // const tagPath = tags
    //   .filter(tag => tag.includes('Notebooks'))
    //   .map(str => str.replace(/Notebooks\//g, ''))
    //   .join('/');
    // console.log('tagPath==', tagPath);

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fields && node.fields.slug) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      }
    });
  });
};
