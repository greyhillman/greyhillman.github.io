{-# LANGUAGE OverloadedStrings #-}

module Resume where

import Development.Build.HTML
import Development.Site
import Page (basic_page)

page :: Page ()
page = basic_page (meta, content)

meta :: Page ()
meta = do
  title "greyhillman - Resume"
  less_css "css/default.less"

content :: Page ()
content = do
  raw_html "<h1>Resume</h1><p>To be added...</p>"
