{-# LANGUAGE OverloadedStrings #-}

module Development.Build.HTML where

import Control.Monad.Reader
import Control.Monad.Writer
import Data.Char (toLower)
import Data.Map
import qualified Data.Map as Map
import Data.String.Conversions
import Data.Text (Text)
import qualified Data.Text as T
import Development.Shake
import Development.Shake.FilePath
import Development.Site

raw_html :: Text -> Page ()
raw_html = tell

css_file :: FilePath -> Page ()
css_file path = do
  lift $ lift $ need [path]
  raw_html $ "<link rel=\"stylesheet\" href=\"" <> cs path <> "\" />"

get_base_url :: FilePath -> FilePath
get_base_url = joinPath . (<$) ".." . tail . splitDirectories

base_url :: Page ()
base_url = do
  url <- asks pc_url
  let base_path = get_base_url url
  raw_html $ "<base href=\"" <> T.pack base_path <> "\" />"

less_css :: FilePath -> Page ()
less_css path = do
  src_dir <- asks (sc_src_dir . pc_sc)
  dst_dir <- asks (sc_dst_dir . pc_sc)

  let src_path = src_dir </> path
  let html_path = toLower <$> path -<.> "css"
  let dst_path = dst_dir </> html_path

  lift $ lift $ need [src_path]

  lift $
    lift $
      command_
        []
        "npx"
        [ "lessc",
          -- Make sure URLs are relative to the base file and not the imported one
          "-ru=local",
          src_path,
          dst_path
        ]

  tell $ "<link rel=\"stylesheet\" href=\"" <> cs html_path <> "\"/>"

acronym :: Text -> Text -> Page ()
acronym short desc = raw_html $ "<abbr title=\"" <> desc <> "\">" <> short <> "</abbr>"

from_attrs :: Map Text Text -> Text
from_attrs = Map.foldlWithKey f T.empty
  where
    f acc key value = acc <> " " <> key <> "\"" <> value <> "\""

wrap :: Text -> Page () -> Page ()
wrap el = wrap_with_attrs el Map.empty

wrap_with_attrs :: Text -> Map Text Text -> Page () -> Page ()
wrap_with_attrs el attrs m = do
  raw_html $ "<" <> el <> " " <> from_attrs attrs <> ">"
  m
  raw_html $ "</" <> el <> ">"

title :: Text -> Page ()
title = wrap "title" . text

header :: Page () -> Page ()
header = wrap "header"

text :: Text -> Page ()
text = tell

code :: Text -> Page ()
code = wrap "code" . text

par :: Page () -> Page ()
par = wrap_with_attrs "p" Map.empty

section :: Page () -> Page ()
section = wrap_with_attrs "section" Map.empty

head :: Page () -> Page ()
head = wrap "head"

body :: Page () -> Page ()
body = wrap "body"
