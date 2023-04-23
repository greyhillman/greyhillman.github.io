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
using FileNotFoundException = Shake.FileSystem.FileNotFoundException;

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

        var htmlFile = new FilePathBuilder(builder.Resource);
        htmlFile.Directory[0] = "site";
        htmlFile.Extension = "html";

        var npmPackageFile = new FilePathBuilder(builder.Resource);
        npmPackageFile.Directory[0] = "site";
        npmPackageFile.Name = "package";
        npmPackageFile.Extension = "json";

        if (await _fileSystem.Exists(markdownFile.Path))
        {
            var markdownHtmlFile = new FilePathBuilder(markdownFile.Path);
            markdownHtmlFile.Directory[0] = "out";
            markdownHtmlFile.Extension = "md.html";

            await builder.Need(markdownHtmlFile.Path);

            await _fileSystem.Copy(markdownHtmlFile.Path, builder.Resource);
        }
        else if (await _fileSystem.Exists(npmPackageFile.Path))
        {
            var npmHtmlFile = new FilePathBuilder(builder.Resource);
            npmHtmlFile.Directory[0] = "out";
            npmHtmlFile.Extension = "npm.html";

            await builder.Need(npmHtmlFile.Path);

            await _fileSystem.Copy(npmHtmlFile.Directory.Directory, builder.Resource.Directory);
        }
        else if (await _fileSystem.Exists(htmlFile.Path))
        {
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
        else
        {
            throw new FileNotFoundException(builder.Resource);
        }

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        return file.Extension == "html";
    }
}
