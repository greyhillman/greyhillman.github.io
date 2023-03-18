using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shake;
using Shake.FilePath;

namespace Site
{
    public static class Build
    {
        public static async Task Main()
        {
            var rules = new List<IRule>();
            AddRules(rules);

            var rule_set = new ListRuleSet(rules);
            var build = new DefaultBuildSystem(rule_set);

            await build.Want(new[]
            {
                "dist/index.html",
                "dist/about.html",
                "dist/resume.html",
            });
        }

        private static void AddRules(List<IRule> rules)
        {
            var markdown = new MarkdownPandocRule();
            markdown.AddFile("dist/index.partial.html");
            markdown.AddFile("dist/about.partial.html");
            markdown.AddFile("dist/resume.partial.html");

            rules.Add(markdown);

            var top_page = new TopPageRule(FilePath.From("site/_layout.html"));
            top_page.AddFile("dist/index.html", "Home");
            top_page.AddFile("dist/about.html", "About");
            top_page.AddFile("dist/resume.html", "Resume");

            rules.Add(top_page);
        }
    }
}
