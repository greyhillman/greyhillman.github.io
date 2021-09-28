{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

module About where

import Development.Build.HTML
import qualified Development.Build.HTML as HTML
import Development.Build.Markdown
import Development.Site
import Page (basic_page)
import Text.RawString.QQ

page :: Page ()
page = basic_page (meta, content)

meta :: Page ()
meta = do
  less_css "css/default.less"
  title "greyhillman - About"

content :: Page ()
content = do
  markdown
    [r|
# About me

My name is Grey. I'm a full-stack developer, avid learner, and soon-to-be writer!

I've started this blog to write down my thoughts about programming and my general philosophy of systems design.
Writing my thoughts down help clarifies my thinking and also allows me to tell others.
Eventually, I'd like to start making [Explorable Explanations](https://explorabl.es), to help me learn topics by attempting to teach others. In general, that's what my posts will be about.
  |]
