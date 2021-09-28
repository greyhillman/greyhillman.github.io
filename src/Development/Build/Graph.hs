{-# LANGUAGE OverloadedStrings #-}

module Development.Build.Graph where

import Control.Applicative (Alternative (empty))
import Control.Monad.Writer
import Data.Map (Map)
import qualified Data.Map as Map
import Data.String.Conversions
import Data.Text (Text)
import qualified Data.Text as T
import Development.Shake
import Development.Site (Page)

dot_graph :: Text -> Page ()
dot_graph content = do
  let cmd_options = [Stdin (cs content)]
  Stdout svg_content <- lift $ lift $ command cmd_options "dot" ["-Tsvg"]
  tell $ T.pack svg_content
