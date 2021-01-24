import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const IndexPage = () => {
  const rawData = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              Title
              url
              title
              sexySharp {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const data = rawData.allMarkdownRemark.edges
  console.log("Data is ", data)

  return (
    <Layout>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {data.map((d, index) => (
          <div
            key={index}
            style={{
              width: "400px",
              borderRadius: "10px",
              background: "#f4f5db",
              padding: "10px",
            }}
          >
            <h3>{d.node.frontmatter.Title}</h3>
            <p>{d.node.frontmatter.title}</p>
            <Img
              fluid={d.node.frontmatter.sexySharp.childImageSharp.fluid}
              alt={d.node.frontmatter.Title}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
