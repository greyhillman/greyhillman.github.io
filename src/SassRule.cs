using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site;

public class SassRule : IRule
{
    public SassRule()
    { }

    public async Task Build(IBuildSystem.IBuilder builder)
    {
        var input_file = FilePath.From(builder.OutputFile);
        input_file.Directory.Levels[0] = "site";
        input_file.Extension = "scss";

        await builder.Need(input_file.ToString());

        var sass = new Process();
        sass.StartInfo.FileName = "rsass";
        sass.StartInfo.ArgumentList.Add(input_file.ToString());
        sass.StartInfo.RedirectStandardOutput = true;
        sass.Start();

        using (var writer = builder.WriteChanged(builder.OutputFile))
        {
            var output = await sass.StandardOutput.ReadToEndAsync();

            await writer.WriteAsync(Encoding.UTF8.GetBytes(output));
        }
    }

    public bool IsFor(string file)
    {
        return FilePath.From(file).Extension == "css";
    }
}
