using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Markdig;
using Markdig.Syntax;
using Markdig.Syntax.Inlines;
using Shake;
using Shake.FileSystem;

namespace Site
{
    public class MarkdownHtmlRule : IRule<FilePath>
    {
        private readonly IFileSystem _fileSystem;
        private readonly MarkdownPipeline _pipeline;

        public MarkdownHtmlRule(IFileSystem fileSystem, MarkdownPipeline pipeline)
        {
            _fileSystem = fileSystem;
            _pipeline = pipeline;
        }

        public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
        {
            var markdownFile = new FilePathBuilder(builder.Resource);
            markdownFile.Extension = "md";
            markdownFile.Directory[0] = "site";

            await builder.Need(markdownFile.Path);

            using (var body = await _fileSystem.ReadText(markdownFile.Path))
            using (var writer = await _fileSystem.SetText(builder.Resource))
            {
                var markdown = await body.ReadToEndAsync();

                var document = Markdown.Parse(markdown);

                var localFiles = new List<FilePath>();
                foreach (var link in document.Descendants<LinkInline>())
                {
                    var directory = new DirectoryBuilder();
                    directory.Down("dist");

                    if (link.Url.StartsWith("/"))
                    {
                        localFiles.Add(directory.Directory + new FilePath(link.Url[1..]));
                    }
                    else if (link.Url.StartsWith("./"))
                    {
                        localFiles.Add(directory.Directory + new FilePath(link.Url[2..]));
                    }
                }

                await builder.Need(localFiles.ToArray());

                var output = Markdown.ToHtml(markdown, _pipeline);

                await writer.WriteAsync(output);
            }

            await builder.Built(builder.Resource);
        }

        public bool IsFor(FilePath file)
        {
            return file.Extension == "md.html";
        }
    }
}
