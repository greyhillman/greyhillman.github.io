using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Shake;
using Shake.FileSystem;

namespace Site;

public class HtmlRule : IRule<FilePath>
{
    private readonly IFileSystem _fileSystem;

    public HtmlRule(IFileSystem file_system)
    {
        _fileSystem = file_system;
    }

    public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
    {
        var outputPath = builder.Resource;

        var markdownFile = new FilePathBuilder(outputPath);
        markdownFile.Directory[0] = "site";
        markdownFile.Extension = "md";

        if (await _fileSystem.Exists(markdownFile.Path))
        {
            var htmlFile = new FilePathBuilder(markdownFile.Path);
            htmlFile.Directory[0] = "out";
            htmlFile.Extension = "md.html";

            var layoutFile = new FilePath("site/_layout.html");

            await builder.Need(htmlFile.Path, layoutFile);

            using (var body = await _fileSystem.ReadText(htmlFile.Path))
            using (var layout = await _fileSystem.ReadText(layoutFile))
            using (var writer = await _fileSystem.SetText(builder.Resource))
            {
                var bodyText = await body.ReadToEndAsync();
                var layoutText = await layout.ReadToEndAsync();

                var depth = builder.Resource.Directory.Depth - 1;

                var baseUrl = new DirectoryBuilder();
                for (var i = 0; i < depth; i++)
                {
                    baseUrl.Down("..");
                }

                var output = layoutText
                    .Replace("{{ body }}", bodyText)
                    .Replace("{{ title }}", "FIX TITLE")
                    .Replace("{{ baseUrl }}", baseUrl.Directory.ToString());

                await writer.WriteAsync(output);
            }
        }
        else
        {
            var htmlFile = new FilePathBuilder(builder.Resource);
            htmlFile.Directory[0] = "site";

            var doc = new HtmlDocument();
            doc.Load(htmlFile.Path.ToString());

            var directory = new DirectoryBuilder(builder.Resource.Directory);
            directory[0] = "dist";

            var neededFiles = new List<FilePath>();
            foreach (var link in doc.DocumentNode.Descendants("link"))
            {
                if (link.Attributes["rel"]?.Value == "stylesheet")
                {
                    var stylesheet = link.Attributes["href"].Value;

                    neededFiles.Add(directory.Directory + new FilePath(stylesheet));
                }
            }

            await builder.Need(neededFiles.ToArray());
        }

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        return file.Extension == "html";
    }
}