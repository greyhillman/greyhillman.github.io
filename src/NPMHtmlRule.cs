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
    public class NPMHtmlRule : IRule<FilePath>
    {
        private readonly IFileSystem _fileSystem;

        public NPMHtmlRule(IFileSystem fileSystem)
        {
            _fileSystem = fileSystem;
        }

        public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
        {
            var packageDirectory = new DirectoryBuilder(builder.Resource.Directory);
            packageDirectory[0] = "site";

            var npmProcess = new Process();
            npmProcess.StartInfo.WorkingDirectory = packageDirectory.Directory.ToString();
            npmProcess.StartInfo.ArgumentList.Add("run");
            npmProcess.StartInfo.ArgumentList.Add("build");
            npmProcess.StartInfo.FileName = "npm";

            npmProcess.Start();

            await npmProcess.WaitForExitAsync();

            var distDirectory = new DirectoryBuilder(packageDirectory.Directory);
            distDirectory.Down("dist");

            var distFiles = Directory.EnumerateFiles(distDirectory.Directory.ToString(), "*", SearchOption.AllDirectories);
            var distFilePaths = distFiles.Select(file => new FilePath(file)).ToArray();
            await builder.Need(distFilePaths);

            var outDirectory = builder.Resource.Directory;

            await _fileSystem.Copy(distDirectory.Directory, outDirectory);

            await builder.Built(builder.Resource);
        }

        public bool IsFor(FilePath file)
        {
            return file.Extension == "npm.html";
        }
    }
}
