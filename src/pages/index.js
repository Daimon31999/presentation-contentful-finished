import * as React from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: center;
  align-items: flex-start;
`

const PostTitle = styled.h1`
  color: black;
`

const StyledImg = styled.img`
  width: 250px;
  height: 150px;
  border: 0.2rem solid black;
`

const StyledPost = styled(Link)`
  background: mistyrose;
  padding: 2rem;
  border: 0.2rem solid black;
  border-radius: 1rem;
  text-decoration: none;
  margin-bottom: 2rem;
`

// markup
const IndexPage = ({ data }) => {
  const posts = data.allContentfulPresentationPost.edges
  console.log('posts', posts)
  return (
    <Wrapper>
      {posts.map(({ node }, index) => (
        <StyledPost
          id={node.id}
          key={node.id}
          to='page'
          state={{ pageIndex: index }}>
          <PostTitle>{node.title}</PostTitle>
          <StyledImg src={node.image.file.url} />
        </StyledPost>
      ))}
    </Wrapper>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query AllPostsQuery {
    allContentfulPresentationPost {
      edges {
        node {
          title
          image {
            file {
              url
            }
          }
          id
        }
      }
    }
  }
`
