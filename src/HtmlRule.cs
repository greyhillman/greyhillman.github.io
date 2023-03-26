using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site;

public class HtmlRule : IRule<FilePath>
{
    private readonly IFileSystem _file_system;

    public HtmlRule(IFileSystem file_system)
    {
        _file_system = file_system;
    }

    public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
    {
        var outputPath = builder.Resource;

        var markdownFile = new FilePathBuilder(outputPath);
        markdownFile.Directory[0] = "site";
        markdownFile.Extension = "md";

        if (File.Exists(markdownFile.Path.ToString()))
        {
            await builder.Need(markdownFile.Path);

            var pandoc = new Process();
            pandoc.StartInfo.FileName = "pandoc";
            pandoc.StartInfo.ArgumentList.Add("--from=markdown");
            pandoc.StartInfo.ArgumentList.Add("--to=html");
            pandoc.StartInfo.ArgumentList.Add(markdownFile.Path.ToString());
            pandoc.StartInfo.RedirectStandardOutput = true;

            pandoc.Start();

            string output = string.Empty;
            using (pandoc.StandardOutput)
            {
                output = await pandoc.StandardOutput.ReadToEndAsync();
            }

            using (var writer = await _file_system.SetText(builder.Resource))
            {
                await writer.WriteAsync(output);
            }
        }
        else
        {
            var htmlFile = new FilePathBuilder(builder.Resource);
            htmlFile.Directory[0] = "site";

            Debug.Assert(File.Exists(htmlFile.Path.ToString()));

            Console.WriteLine(builder.Resource);

            await _file_system.Copy(htmlFile.Path, builder.Resource);
        }

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        return (file.Extension == "html" || file.Extension == "md.html")
            && file.Directory[0] != "site";
    }
}
