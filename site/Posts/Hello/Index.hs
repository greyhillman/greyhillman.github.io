{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

module Posts.Hello.Index where

import Development.Build.Graph (dot_graph)
import Development.Build.HTML
import Development.Build.Markdown (markdown)
import Development.Site (Page)
import Posts.Post
import Text.RawString.QQ

page :: Page ()
page = post (meta, content)

meta :: Page ()
meta = do
  less_css "Posts/Hello/style.less"
  title "greyhillman - Hello, world!"

content :: Page ()
content = do
  header $ text "Hello, world!"
  let dsl = acronym "DSL" "Domain-Specific Language"
  let edsl = acronym "EDSL" "Embedded Domain-Specific Language"
  par $ do
    text "This is a test post using a custom " >> edsl >> text " in Haskell for my blog. This will eventually become an " >> edsl >> text " for my Explorable Explanations!"
  section $ do
    header $ text "Why an " >> edsl >> text "?"
    par $ do
      text "At first, I was thinking of creating a superset of Markdown to handle the stuff I wanted to do. This meant that I had to write a parser for this new " >> dsl >> text "."
      text " For static pages, this wouldn't be so bad. However, with dynamic pages for explorable explanations, I would have to implement a basic programming language. It would be easier and simpler to rely on another language: in this case, Haskell."
    par $ do
      text "I also tried jusing Dhall for \"configuring\" the site and pages to my liking. However, this was proving more difficult as pages lend themselves to a recursive style: you can have headers, sub-headers, sub-sub headers, etc."
      text " Also, it was becoming a pain-in-the-ass to actually write content and wouldn't handle Explorable Explanation functionality."
    par $ do
      text "Instead, I took the halfway point of an " *> edsl *> text ", which sits below a " *> dsl *> text " but also not a configuration-like thing. It would allow me to add more Explorable Explanation functionality later, which is my main goal of this blog."
  section $ do
    header $ text "Examples"
    par $ text "We can create static graphs inline with the rest of the content."
    raw_html "<figure>"
    section $ do
      dot_graph
        [r|
graph simple {
  a [label="A"];
  b [label="B"];

  a -- b [label="Undirected edge"];
}
      |]
      dot_graph
        [r|
digraph simple {
  a [label="A"];
  b [label="B"];

  a -> b [label="Directed edge"];
}
      |]
    raw_html "<figcaption>"
    text "This is a figure for two graphs generated from " >> code "dot" >> text "."
    raw_html "</figcaption>"
    raw_html "</figure>"
