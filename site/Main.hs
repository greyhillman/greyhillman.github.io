{-# LANGUAGE OverloadedStrings #-}

module Main where

import qualified About
import Control.Monad
import Data.String.Conversions
import qualified Data.Text as T
import Development.Shake
import Development.Shake.FilePath
import Development.Site
import qualified Home
import qualified Posts.Hello.Index as Hello
import qualified Posts.Index as Posts
import qualified Resume
import Text.Pandoc.Class (setVerbosity)

site :: Site ()
site = do
  page "index" Home.page
  page "about" About.page
  page "resume" Resume.page
  top_page "posts" Posts.page $ do
    page "hello" Hello.page

main :: IO ()
main = do
  shakeArgs shakeOptions $ do
    run_site
      site
      ( SiteContext
          { sc_src_dir = "site",
            sc_dst_dir = "_site",
            sc_url_dir = ""
          }
      )
    "_site/image/*.png" %> \out -> do
      let src = replaceDirectory out "site/image"
      need [src]
      copyFileChanged src out
    phony "clean" $ do
      liftIO $ removeFiles "_site" ["*"]
