{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

module Page where

import Control.Monad.Reader
import Development.Build.HTML
import qualified Development.Build.HTML as HTML
import Development.Shake (copyFileChanged, need)
import Development.Shake.FilePath
import Development.Site
import Text.RawString.QQ

basic_page :: (Page (), Page ()) -> Page ()
basic_page (meta, content) = do
  HTML.wrap "html" $ do
    HTML.head $ do
      base_url
      meta
    HTML.body $ do
      top_nav
      HTML.wrap "main" content
      page_footer

top_nav :: Page ()
top_nav = do
  HTML.wrap "nav" $ do
    HTML.wrap "ol" $ do
      raw_html "<li><a href=\"index.html\">Home</a></li>"
      raw_html "<li><a href=\"about.html\">About</a></li>"
      raw_html "<li><a href=\"posts/index.html\">Posts</a></li>"
      raw_html "<li><a href=\"resume.html\">Resume</a></li>"

page_footer :: Page ()
page_footer = do
  dst_dir <- asks (sc_dst_dir . pc_sc)
  lift $ lift $ need [dst_dir </> "image/GitHub-Mark-32px.png"]
  lift $ lift $ need [dst_dir </> "image/In-Blue-34.png"]
  raw_html
    [r|
<footer>
  <ul>
    <li><a class="icon github" href="https://github.com/greyhillman">GitHub</a></li>
    <li><a class="icon linkedin" href="https://www.linkedin.com/in/greyhillman/">LinkedIn</a></li>
  </ul>
</footer>
  |]
