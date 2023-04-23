using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Markdig;
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
                new FilePath("dist/simulators/index.html"),
            });
        }

        private static void AddRules(List<IRule<FilePath>> rules, IFileSystem fileSystem)
        {
            var html = new HtmlRule(fileSystem);
            rules.Add(html);

            var markdownHtml = new MarkdownHtmlRule(fileSystem, BuildMarkdownPipeline());
            rules.Add(markdownHtml);

            var npmHtml = new NPMHtmlRule(fileSystem);
            rules.Add(npmHtml);

            var sass = new CssRule(fileSystem);
            rules.Add(sass);

            var copyFiles = new CopyRule(fileSystem);
            rules.Add(copyFiles);

            var sourceRule = new SourceFileRule(fileSystem);
            rules.Add(sourceRule);
        }

        private static MarkdownPipeline BuildMarkdownPipeline()
        {
            var builder = new MarkdownPipelineBuilder()
                .UseYamlFrontMatter();

            builder.Extensions.Add(new GraphExtension());

            return builder.Build();
        }
    }
}
