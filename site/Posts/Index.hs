{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

module Posts.Index where

import Development.Build.HTML
import qualified Development.Build.HTML as HTML
import Development.Build.Markdown (markdown)
import Development.Site
import Page (basic_page)
import Text.RawString.QQ

page :: Page ()
page = basic_page (meta, content)

meta :: Page ()
meta = do
  less_css "css/default.less"
  title "greyhillman - Posts"

content :: Page ()
content = do
  markdown
    [r|
# Posts

- [Hello, world!](posts/hello.html)
  |]
