using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site;

public class HtmlRule : IRule
{
    public async Task Build(IBuildSystem.IBuilder builder)
    {
        var outputPath = new FilePath(builder.OutputFile);

        var markdownFile = new FilePathBuilder(outputPath);
        markdownFile.Directory[0] = "site";
        markdownFile.Extension = "md";

        if (File.Exists(markdownFile.Path.ToString()))
        {
            await builder.Need(markdownFile.Path.ToString());

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

            using (var writer = builder.WriteChanged(builder.OutputFile))
            {
                await writer.WriteAsync(Encoding.UTF8.GetBytes(output));
            }
        }
        else
        {
            var htmlFile = new FilePathBuilder(builder.OutputFile);
            htmlFile.Directory[0] = "site";

            Debug.Assert(File.Exists(htmlFile.Path.ToString()));

            Console.WriteLine(builder.OutputFile);

            await builder.Copy(htmlFile.Path.ToString(), builder.OutputFile);
        }
    }

    public bool IsFor(string file)
    {
        var path = new FilePath(file);

        return path.Extension == "html"
            && path.Directory[0] != "site";
    }
}
