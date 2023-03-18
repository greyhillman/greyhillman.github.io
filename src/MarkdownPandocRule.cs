using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site
{
    public class MarkdownPandocRule : IRule
    {
        private readonly List<string> _files;

        public MarkdownPandocRule()
        {
            _files = new();
        }

        public void AddFile(string file)
        {
            _files.Add(file);
        }

        public async Task Build(IBuildSystem.IBuilder builder)
        {
            var markdownFile = FilePath.From(builder.OutputFile);
            markdownFile.Extension = "md";
            markdownFile.Directory.Levels[0] = "site";

            await builder.Need(markdownFile.ToString());

            var pandoc = new Process();
            pandoc.StartInfo.FileName = "pandoc";
            pandoc.StartInfo.ArgumentList.Add("--from=markdown");
            pandoc.StartInfo.ArgumentList.Add("--to=html");
            pandoc.StartInfo.ArgumentList.Add(markdownFile.ToString());
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

        public bool IsFor(string file)
        {
            return _files.Contains(file);
        }
    }
}
