export const ExampleFetch = [
  {
    title: 'Critical Security Update: Next.js 15.2.3 Fixes CVE-2025-29927',
    url: 'https://rhyno.io/blogs/cybersecurity-news/critical-security-update-next-js-15-2-3-fixes-cve-2025-29927/',
    content:
      "Critical Security Update (CVE-2025-29927) Next.js has rolled out version 15.2.3 to address a critical security issue (CVE-2025-29927). This update, along with backported patches for previous versions, is essential for all self-hosted deployments using Middleware with next start and output: 'standalone'.",
    score: 0.75355774,
    raw_content: null,
  },
  {
    title:
      'Bypassing Middleware in Next.js: What CVE-2025-29927 Means for Security ...',
    url: 'https://asteros.com/2025/03/bypassing-middleware-in-next-js-what-cve-2025-29927-means-for-security-teams/',
    content:
      'A recently disclosed vulnerability in the Next.js framework (CVE-2025-29927) highlights a familiar but serious problem: small implementation details can have big security consequences. This particular issue carries a CVSS score of 9.1 and allows attackers to bypass middleware-based authorization checks in self-hosted Next.js apps — meaning requests could reach protected endpoints without',
    score: 0.59061456,
    raw_content: null,
  },
  {
    title:
      'Critical Next.js Vulnerability Allows Attackers to Bypass Middleware ...',
    url: 'https://thehackernews.com/2025/03/critical-nextjs-vulnerability-allows.html',
    content:
      'Critical Next.js Vulnerability Allows Attackers to Bypass Middleware Authorization Checks Critical Next.js Vulnerability Allows Attackers to Bypass Middleware Authorization Checks "The vulnerability allows attackers to easily bypass authorization checks performed in Next.js middleware, potentially allowing attackers access to sensitive web pages reserved for admins or other high-privileged users," JFrog said. The company also said any host website that utilizes middleware to authorize users without any additional authorization checks is vulnerable to CVE-2025-29927, potentially enabling attackers to access otherwise unauthorized resources (e.g., admin pages).  __Share on Facebook __Share on Twitter __Share on Linkedin __Share on Reddit __Share on Hacker News __Share on Email __Share on WhatsApp Share on Facebook Messenger __Share on Telegram Critical Next.js Vulnerability Allows Attackers to Bypass Middleware Authorization Checks',
    score: 0.568632,
    raw_content: null,
  },
  {
    title: 'CVE-2025-29927 - Next.js',
    url: 'https://nextjs.org/blog/cve-2025-29927',
    content:
      "CVE-2025-29927 | Next.js Next.js version 15.2.3 has been released to address a security vulnerability (CVE-2025-29927). We recommend that all self-hosted Next.js deployments using next start and output: 'standalone' should update immediately. 2025-02-27T06:03Z: Disclosure to Next.js team via GitHub private vulnerability reporting 2025-03-14T17:13Z: Next.js team started triaging the report 2025-03-14T19:08Z: Patch pushed for Next.js 15.x 2025-03-14T19:26Z: Patch pushed for Next.js 14.x 2025-03-17T22:44Z: Next.js 14.2.25 released 2025-03-18T00:23Z: Next.js 15.2.3 released 2025-03-21T10:17Z: Security Advisory published 2025-03-22T21:21Z: Next.js 13.5.9 released Self-hosted Next.js applications using Middleware (next start with output: standalone) If patching to a safe version is infeasible, it is recommended that you prevent external user requests which contain the x-middleware-subrequest header from reaching your Next.js application. Next.js has published 16 security advisories since 2016.",
    score: 0.48689327,
    raw_content: null,
  },
  {
    title:
      'Warning for developers, web admins: update Next.js to ... - InfoWorld',
    url: 'https://www.infoworld.com/article/3853904/warning-for-developers-web-admins-update-next-js-to-prevent-exploit.html',
    content:
      'Developers and web admins using the Next.js framework for building or managing interactive web applications should install a security update to plug a critical vulnerability. The vulnerability',
    score: 0.33737868,
    raw_content: null,
  },
]
