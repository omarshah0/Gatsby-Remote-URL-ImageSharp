const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Site implements Node {
        shaskKaSharp: File @link(from: "shaskKaSharp___NODE")
    }
    type Frontmatter {
        url: String
        sexySharp: File @link(from: "sexySharp___NODE")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter.url !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.frontmatter.url, // string that points to the URL of the image
      parentNodeId: node.frontmatter.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    })
    if (fileNode) {
      node.frontmatter.sexySharp___NODE = fileNode.id
    }
  }
  if (node.internal.type === "Site") {
    let fileNode = await createRemoteFileNode({
      url:
        "https://www.fromoldbooks.org/Bell-BritishLocomotivesIllustrated/24-Re-constructed-Atlantic-type-Locomotive-q75-500x300.jpg", // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    })
    if (fileNode) {
      node.shaskKaSharp___NODE = fileNode.id
    }
  }
}
