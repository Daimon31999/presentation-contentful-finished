import * as React from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0 3rem;
`

const StyledParagraph = styled.div`
  font-size: 20px;
  color: rebeccapurple;
`

const StyledTitle = styled.h1`
  font-size: 4rem;
`

const StyledHeader = styled.header`
  border-bottom: 0.2rem solid black;
  width: 100%;
  padding: 1rem 0;s
`

const StyledCodeBlock = styled.div`
  border: 0px;
  padding: 1.5rem;
  background: hsla(0, 0%, 0%, 0.04);
  line-height: 1.42;
  font-size: 0.85rem;
  overflow: auto;
  word-wrap: normal;
  font-family: monospace, monospace;
  color: black;
`

const GoHomeLink = styled(Link)`
  color: rebeccapurple;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
`

const StyledImg = styled.img`
  width: 400px;
  height: auto;
`

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <b>{text}</b>,
    [MARKS.CODE]: (text) => <StyledCodeBlock>{text}</StyledCodeBlock>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <StyledParagraph>{children}</StyledParagraph>
    ),

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imgUrl = node.data.target.file.url
      const imgTitle = node.data.target.title
      return <StyledImg src={imgUrl} alt={imgTitle} />
    },
  },
}

// markup
const PostPage = ({ data, location }) => {
  const pageIndex = location?.state?.pageIndex || 0
  console.log('pageIndex', pageIndex)
  const post = data?.allContentfulPresentationPost?.edges[pageIndex]?.node

  return (
    <Wrapper>
      <StyledHeader>
        <GoHomeLink to='/'>Home</GoHomeLink>
      </StyledHeader>
      <StyledTitle>{post?.title}</StyledTitle>
      {post && renderRichText(post?.blogBody, options)}
    </Wrapper>
  )
}

export default PostPage

export const postQuery = graphql`
  query PostQuery {
    allContentfulPresentationPost {
      edges {
        node {
          blogBody {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                __typename
                title
                file {
                  url
                }
              }
            }
          }
          dateCreated
          title
        }
      }
    }
  }
`
