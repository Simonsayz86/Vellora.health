module.exports = function(eleventyConfig) {
    // Copy static assets
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/sitemap.xml");
    eleventyConfig.addPassthroughCopy("src/og-image.png");
    eleventyConfig.addPassthroughCopy("src/logo.svg");
    eleventyConfig.addPassthroughCopy("src/CNAME");

    // Date formatting filter
    eleventyConfig.addFilter("dateFormat", function(date) {
          return new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
          });
    });

    // Short date filter
    eleventyConfig.addFilter("shortDate", function(date) {
          return new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
          });
    });

    // ISO date filter for schema
    eleventyConfig.addFilter("isoDate", function(date) {
          return new Date(date).toISOString().split('T')[0];
    });

    // Reading time filter
    eleventyConfig.addFilter("readingTime", function(content) {
          const wordsPerMinute = 200;
          const words = content.split(/\s+/).length;
          const minutes = Math.ceil(words / wordsPerMinute);
          return minutes;
    });

    // Excerpt filter
    eleventyConfig.addFilter("excerpt", function(content, length = 160) {
          const text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
          return text.length > length ? text.substring(0, length) + '...' : text;
    });

    // Blog collection
    eleventyConfig.addCollection("blog", function(collectionApi) {
          return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => {
                  return b.date - a.date;
          });
    });

    // Latest posts collection
    eleventyConfig.addCollection("latestPosts", function(collectionApi) {
          return collectionApi.getFilteredByGlob("src/blog/*.md")
            .sort((a, b) => b.date - a.date)
            .slice(0, 3);
    });

    return {
          dir: {
                  input: "src",
                  output: "_site",
                  includes: "_includes",
                  layouts: "_layouts",
                  data: "_data"
          },
          templateFormats: ["html", "md", "njk"],
          htmlTemplateEngine: "njk",
          markdownTemplateEngine: "njk"
    };
};
