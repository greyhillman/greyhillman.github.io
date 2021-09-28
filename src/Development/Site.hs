{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE OverloadedStrings #-}

module Development.Site where

import Control.Monad.Reader
import Control.Monad.Writer
import Data.String.Conversions
import Data.Text (Text)
import Development.Shake
import Development.Shake.FilePath

data SiteContext = SiteContext
  { sc_dst_dir :: FilePath,
    sc_src_dir :: FilePath,
    sc_url_dir :: FilePath
  }

data PageContext = PageContext
  { pc_sc :: SiteContext,
    pc_url :: FilePath
  }

-- For building the page
type Page = ReaderT PageContext (WriterT Text Action)

-- For building the whole site
type Site = ReaderT SiteContext Rules

run_site :: Site () -> SiteContext -> Rules ()
run_site = runReaderT

under_page :: FilePath -> SiteContext -> SiteContext
under_page path site_context =
  site_context
    { sc_url_dir = sc_url_dir site_context </> path
    }

top_page :: FilePath -> Page () -> Site () -> Site ()
top_page directory page_data sub_pages = do
  let file = directory </> "index.html"
  page file page_data
  local (under_page directory) sub_pages

run_page_builder :: PageContext -> Page () -> Action Text
run_page_builder pc m = execWriterT $ runReaderT m pc

fdsa :: (Monoid a) => (Page a -> Action a) -> [Page a] -> Action a
fdsa f xs = mconcat <$> traverse f xs

page :: FilePath -> Page () -> Site ()
page leaf_url page_data = do
  sc <- ask

  url_dir <- asks sc_url_dir
  dst_dir <- asks sc_dst_dir

  let url = url_dir </> leaf_url
  let dst = dst_dir </> url -<.> "html"

  let pc = PageContext sc url

  lift $ do
    want [dst]
    dst %> \_ -> do
      page_content <- run_page_builder pc page_data
      writeFileChanged dst (cs page_content)
