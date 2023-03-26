using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Shake;
using Shake.FileSystem;

namespace Site
{
    public static class Build
    {
        public static async Task Main()
        {
            var working_directory = new DirectoryPath(Directory.GetCurrentDirectory());

            var file_system = new DefaultFileSystem(working_directory);

            var rules = new List<IRule<FilePath>>();
            AddRules(rules, file_system);


            var rule_set = new ListRuleSet<FilePath>(rules);
            var build = new DefaultBuildSystem<FilePath>(rule_set);

            await build.Want(new[]
            {
                new FilePath("dist/index.html"),
                new FilePath("dist/about.html"),
                new FilePath("dist/resume.html"),
                new FilePath("dist/posts/index.html"),
            });
        }

        private static void AddRules(List<IRule<FilePath>> rules, IFileSystem fileSystem)
        {
            var top_page = new TopPageRule(fileSystem, new FilePath("site/_layout.html"));
            top_page.AddFile("dist/index.html", "Home");
            top_page.AddFile("dist/about.html", "About");
            top_page.AddFile("dist/resume.html", "Resume");

            rules.Add(top_page);

            var html = new HtmlRule(fileSystem);
            rules.Add(html);

            var sass = new SassRule(fileSystem);
            rules.Add(sass);

            var copy_files = new CopyRule(fileSystem);
            copy_files.AddFile("dist/image/GitHub-Mark-32px.png");
            copy_files.AddFile("dist/image/In-Blue-34.png");

            rules.Add(copy_files);

            var sourceRule = new SourceRule<FilePath>();
            rules.Add(sourceRule);
        }
    }
}
