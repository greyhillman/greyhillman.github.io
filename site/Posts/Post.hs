{-# LANGUAGE OverloadedStrings #-}

module Posts.Post where

import Development.Build.HTML (raw_html)
import Development.Site
import Page (basic_page)

post :: (Page (), Page ()) -> Page ()
post (meta, content) = basic_page (post_meta, post_content)
  where
    post_meta = do
      meta
    post_content = do
      raw_html "<article>"
      content
      raw_html "</article>"
