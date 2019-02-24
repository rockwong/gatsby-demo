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
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
    });

    console.log('slug==', slug);
    console.log('tags==', tags);
    const addSlugField = value =>
      createNodeField({
        node,
        name: `slug`,
        value,
      });
    if (tags.some(tag => tag.includes('Notebooks'))) {
      tags
        .filter(tag => tag.includes('Notebooks'))
        .forEach(str => {
          const noteStr = str.replace(/Notebooks\//g, '');
          const navName = noteStr.split('/')[0];
          createNodeField({
            node,
            name: `navName`,
            value: navName,
          });
          const tagPath = slug.replace(/notes/g, noteStr);
          addSlugField(tagPath);
        });
    } else {
      addSlugField(slug);
    }
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
