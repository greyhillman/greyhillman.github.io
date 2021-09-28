{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

module Home where

import Data.Text (Text)
import Development.Build.HTML
import Development.Build.Markdown (markdown)
import Development.Site
import Page (basic_page)
import Text.RawString.QQ

page :: Page ()
page = basic_page (meta, content)

meta :: Page ()
meta = do
  title "greyhillman - Home"
  less_css "css/default.less"

content :: Page ()
content = do
  markdown
    [r|
# Home

This is my new blog! Hopefully, I'll actually start putting
stuff up here rather than leaving it mostly blank. I plan
to write articles to help me understand topics by attempting
to explain it to others. I've really taken a liking to [Explorable Explanations](https://explorabl.es)
, which are fun ways to learn a topic.
  |]
