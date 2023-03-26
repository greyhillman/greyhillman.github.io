using System.Diagnostics;
using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site
{
    public class MarkdownPandocRule : IRule<FilePath>
    {
        private readonly IFileSystem _file_system;

        public MarkdownPandocRule(IFileSystem file_system)
        {
            _file_system = file_system;
        }

        public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
        {
            var markdownFile = new FilePathBuilder(builder.Resource);
            markdownFile.Extension = "md";
            markdownFile.Directory[0] = "site";

            await builder.Need(markdownFile.Path);

            var pandoc = new Process();
            pandoc.StartInfo.FileName = "pandoc";
            pandoc.StartInfo.ArgumentList.Add("--from=markdown");
            pandoc.StartInfo.ArgumentList.Add("--to=html");
            pandoc.StartInfo.ArgumentList.Add(markdownFile.Path.ToString());
            pandoc.StartInfo.RedirectStandardOutput = true;

            pandoc.Start();

            using (var writer = await _file_system.SetText(builder.Resource))
            {
                var output = await pandoc.StandardOutput.ReadToEndAsync();

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
