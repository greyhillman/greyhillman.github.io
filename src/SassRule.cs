using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site;

public class SassRule : IRule<FilePath>
{
    private readonly IFileSystem _file_system;

    public SassRule(IFileSystem file_system)
    {
        _file_system = file_system;
    }

    public async Task Build(IBuildSystem<FilePath>.IBuilder builder)
    {
        var input_file = new FilePathBuilder(builder.Resource);
        input_file.Directory[0] = "site";
        input_file.Extension = "scss";

        await builder.Need(input_file.Path);

        var sass = new Process();
        sass.StartInfo.FileName = "rsass";
        sass.StartInfo.ArgumentList.Add(input_file.Path.ToString());
        sass.StartInfo.RedirectStandardOutput = true;
        sass.Start();

        await sass.WaitForExitAsync();

        using (var writer = await _file_system.SetText(builder.Resource))
        {
            var output = await sass.StandardOutput.ReadToEndAsync();

            var urls = Regex.Matches(output, @"url\(""(.*)""\)");

            var files = new List<FilePath>();
            foreach (Match url in urls)
            {
                files.Add(builder.Resource.Directory + new FilePath(url.Groups[1].Value));
            }

            await builder.Need(files.ToArray());

            await writer.WriteAsync(output);
        }

        await builder.Built(builder.Resource);
    }

    public bool IsFor(FilePath file)
    {
        return file.Extension == "css";
    }
}
