const assert = require("node:assert/strict");
const test = require("node:test");

const {
  injectVerificationMeta,
} = require("./inject-seo-verification");

const baseHtml = `<!doctype html>
<html>
  <head>
    <title>Dynicty</title>
    <meta name="description" content="Existing description">
    <link rel="canonical" href="https://dynicty.com/">
    <meta property="og:title" content="Dynicty">
  </head>
  <body></body>
</html>`;

const settings = (overrides = {}) => ({
  seo: {
    google_site_verification: "",
    bing_site_verification: "",
    facebook_domain_verification: "",
    ...overrides,
  },
});

const countMeta = (html, name) =>
  (html.match(new RegExp(`<meta\\s+name="${name}"`, "gi")) || []).length;

test("no token produces no verification meta tags", () => {
  const output = injectVerificationMeta(baseHtml, settings());
  assert.equal(countMeta(output, "google-site-verification"), 0);
  assert.equal(countMeta(output, "msvalidate.01"), 0);
  assert.equal(countMeta(output, "facebook-domain-verification"), 0);
});

test("token A produces exactly one Google verification tag", () => {
  const output = injectVerificationMeta(
    baseHtml,
    settings({ google_site_verification: "A" })
  );
  assert.equal(countMeta(output, "google-site-verification"), 1);
  assert.match(output, /name="google-site-verification" content="A"/);
});

test("changing A to B replaces A and leaves only B", () => {
  const withA = injectVerificationMeta(
    baseHtml,
    settings({ google_site_verification: "A" })
  );
  const withB = injectVerificationMeta(
    withA,
    settings({ google_site_verification: "B" })
  );
  assert.equal(countMeta(withB, "google-site-verification"), 1);
  assert.doesNotMatch(withB, /content="A"/);
  assert.match(withB, /content="B"/);
});

test("removing a token removes its existing tag", () => {
  const withToken = injectVerificationMeta(
    baseHtml,
    settings({ bing_site_verification: "BING" })
  );
  const removed = injectVerificationMeta(withToken, settings());
  assert.equal(countMeta(removed, "msvalidate.01"), 0);
});

test("repeated execution is idempotent and creates no duplicates", () => {
  const configured = settings({
    google_site_verification: "GOOGLE",
    bing_site_verification: "BING",
    facebook_domain_verification: "FACEBOOK",
  });
  const once = injectVerificationMeta(baseHtml, configured);
  const twice = injectVerificationMeta(once, configured);
  assert.equal(twice, once);
  assert.equal(countMeta(twice, "google-site-verification"), 1);
  assert.equal(countMeta(twice, "msvalidate.01"), 1);
  assert.equal(countMeta(twice, "facebook-domain-verification"), 1);
});

test("tokens are escaped as attribute values and existing SEO is preserved", () => {
  const output = injectVerificationMeta(
    baseHtml,
    settings({ google_site_verification: 'A"><script>alert(1)</script>' })
  );
  assert.match(output, /content="A&quot;&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;"/);
  assert.match(output, /<title>Dynicty<\/title>/);
  assert.match(output, /name="description" content="Existing description"/);
  assert.match(output, /rel="canonical" href="https:\/\/dynicty.com\/"/);
  assert.match(output, /property="og:title" content="Dynicty"/);
});

test("legacy duplicate verification tags are consolidated", () => {
  const duplicateHtml = baseHtml.replace(
    "</head>",
    '<meta content="OLD" name="google-site-verification">\n' +
      '<meta name="google-site-verification" content="OLD">\n</head>'
  );
  const output = injectVerificationMeta(
    duplicateHtml,
    settings({ google_site_verification: "NEW" })
  );
  assert.equal(countMeta(output, "google-site-verification"), 1);
  assert.doesNotMatch(output, /content="OLD"/);
});
