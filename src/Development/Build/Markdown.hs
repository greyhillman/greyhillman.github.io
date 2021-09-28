module Development.Build.Markdown where

import Control.Monad.Writer
import Data.Text (Text)
import Development.Site
import Text.Pandoc

to_html :: PandocMonad m => Text -> m Text
to_html text = do
  doc <- readMarkdown def text
  writeHtml5String def doc

markdown :: Text -> Page ()
markdown content = do
  let pandoc_result = runPure $ to_html content
  html_content <- liftIO $ handleError pandoc_result
  tell html_content
