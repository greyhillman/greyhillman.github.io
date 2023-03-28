using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Markdig;
using Markdig.Extensions.Yaml;
using Markdig.Syntax;
using Markdig.Syntax.Inlines;
using Shake;
using Shake.FileSystem;
using YamlDotNet.Serialization;

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

                var document = Markdown.Parse(markdown, _pipeline);

                var frontMatter = document.Descendants<YamlFrontMatterBlock>().Single();

                var yamlDeserializer = new DeserializerBuilder()
                    .Build();

                var yaml = new MemoryStream();
                var yamlWriter = new StreamWriter(yaml);
                var yamlReader = new StreamReader(yaml);

                foreach (var line in frontMatter.Lines.Lines)
                {
                    yamlWriter.WriteLine(line.Slice.AsSpan());
                }
                yamlWriter.Flush();
                yaml.Seek(0, SeekOrigin.Begin);

                var attributes = yamlDeserializer.Deserialize<Dictionary<string, string>>(yamlReader);

                var layoutFile = new DirectoryPath("site") + new FilePath(attributes["layout"]);

                await builder.Need(layoutFile);

                var layoutStream = await _fileSystem.ReadText(layoutFile);
                var layout = await layoutStream.ReadToEndAsync();

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

                var baseUrlBuilder = new DirectoryBuilder();
                for (var i = 0; i < builder.Resource.Directory.Depth - 1; i++)
                {
                    baseUrlBuilder.Down("..");
                }

                var baseUrl = baseUrlBuilder.Directory;

                var output = Markdown.ToHtml(markdown, _pipeline);

                output = layout
                    .Replace("{{ body }}", output)
                    .Replace("{{ title }}", attributes["title"])
                    .Replace("{{ baseUrl }}", baseUrl.ToString());

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
