# PocketShell search queries and SEO priorities

Captured on 2 October 2026 from the [PocketShell Search Console performance report](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Apocketshell.io). Prioritize the existing iPad SSH guide first, then improve SSH configuration and authorized_keys coverage. These are proposed editorial priorities based on a small initial sample.

## Source and limits

Search type: Web (text). Selected report window: last 3 months. The chart displayed 23–29 September 2026; the report was last updated about 11 hours before capture. Property totals: 235 impressions, 3 clicks, 1.3% CTR, average position 16.1.

All 28 disclosed query rows total 55 impressions and 0 clicks. They do not account for all traffic or reveal which searches produced the 3 clicks. Google omits anonymized queries and some other rows from query tables while including them in chart totals; see [Google’s explanation](https://support.google.com/webmasters/answer/17011259?hl=en). These counts measure appearances of this site, not total market search volume. Average positions are observations, not guaranteed current rankings.

## Captured queries

| Query | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| ssh on ipad | 0 | 5 | 0% | 9.4 |
| ssh config | 0 | 5 | 0% | 83.4 |
| ssh config file | 0 | 5 | 0% | 84.2 |
| ssh from ipad | 0 | 4 | 0% | 10.3 |
| authorized keys ssh | 0 | 3 | 0% | 41.7 |
| ssh authorized keys | 0 | 3 | 0% | 49.7 |
| config file in ssh | 0 | 3 | 0% | 81.3 |
| pocket shell os | 0 | 2 | 0% | 5.0 |
| ipad ssh | 0 | 2 | 0% | 10.0 |
| authorized_keys location | 0 | 2 | 0% | 40.5 |
| authorized keys | 0 | 2 | 0% | 50.0 |
| ipad ssh app | 0 | 2 | 0% | 51.0 |
| config file ssh | 0 | 2 | 0% | 81.5 |
| pocket shell ios | 0 | 1 | 0% | 3.0 |
| pocketshell | 0 | 1 | 0% | 5.0 |
| how to ssh from ipad | 0 | 1 | 0% | 9.0 |
| i am using codex | 0 | 1 | 0% | 12.0 |
| webssh ios | 0 | 1 | 0% | 19.0 |
| ssh config file examples | 0 | 1 | 0% | 20.0 |
| ssh iphone | 0 | 1 | 0% | 38.0 |
| man ssh config | 0 | 1 | 0% | 62.0 |
| ssh config comment | 0 | 1 | 0% | 66.0 |
| ssh configuration file | 0 | 1 | 0% | 68.0 |
| edit ssh config file | 0 | 1 | 0% | 70.0 |
| ssh config host | 0 | 1 | 0% | 71.0 |
| config ssh | 0 | 1 | 0% | 76.0 |
| create ssh config file | 0 | 1 | 0% | 83.0 |
| identityfile ssh config | 0 | 1 | 0% | 88.0 |

## Editorial priorities

| Priority | Cluster | Disclosed impressions | Proposed work |
|---|---|---:|---|
| 1 | iPad and iPhone SSH, including WebSSH | 16 | Improve the existing mobile SSH guide before adding another overlapping article. |
| 2 | SSH configuration | 24 | Strengthen the existing configuration guide around specific tasks and examples. |
| 3 | authorized_keys | 10 | Make file location and public key installation easier to find in the existing hardening guide. |
| 4 | PocketShell name variants | 4 | Clarify the product and supported platforms; avoid targeting unrelated OS intent. |
| Watch | Codex | 1 | Keep the agent cluster, but do not infer substantial demand from one ambiguous query. |

### Improve the mobile SSH guide first

The query “ssh on ipad” is confirmed in Search Console to show `/blog/ssh-from-ipad-iphone/`. The same page is the proposed target for the related mobile queries; their individual page associations were not checked. “ssh on ipad” averages position 9.4, “ssh from ipad” 10.3, “ipad ssh” 10.0, and “how to ssh from ipad” 9.0. These are the strongest early ranking signals.

Add a short answer near the beginning explaining native client and browser options, with a usable path for each. Replace the current blanket heading “There’s no built-in terminal, so you need an app” with wording that includes the browser route. Bring the browser option forward from the final section. Add a compact comparison covering key setup, keyboard use, and connection persistence; verify any current competitor claims before publication. Link this guide from the homepage and relevant agent-from-phone posts. Consider a search title such as “SSH on iPad and iPhone: Apps, Keys and Browser Access,” then measure rather than assuming it improves CTR. Keep the URL.

### Make SSH configuration answer specific tasks

Use `/blog/ssh-config-file/` as the proposed target. “ssh config file examples” already averages position 20, while broader terms average roughly 62–88. Improve the existing article around creating and editing `~/.ssh/config`, comments, `Host`, and `IdentityFile`, with a minimal copyable example and an explanation of each line. Much of this is already covered; strengthen discoverability and missing explanations instead of repeating content. Use clear headings and internal links from related SSH guides. Avoid creating separate pages for every wording variant.

### Make authorized_keys location explicit

Use `/blog/ssh-authorized-keys-hardening/` as the proposed target. The four disclosed variants have 10 impressions, with average positions 40.5–50. Add or improve a concise section explaining the server-side `~/.ssh/authorized_keys` location, how it differs from a private key, installation, and permissions. Keep the existing hardening and troubleshooting material. Verify technical instructions before publication.

### Preserve product relevance

“pocketshell,” “pocket shell ios,” and “pocket shell os” have only 4 impressions combined. The last query may reflect unrelated intent; do not present PocketShell as an operating system. Explain supported desktop, Android, and browser use accurately, and distinguish browser access on iOS from any native iOS app claim. Keep the AI agent content as product-led coverage; this snapshot does not establish its search demand.

## Work queue and measurement

1. Refresh the mobile guide and its internal links.
2. Refresh the config guide around examples and the observed task queries.
3. Refresh the authorized_keys guide around file location.
4. Revisit the sitemap fetch issue and indexing report so new coverage can be discovered.
5. After roughly 28 days, compare equal reporting windows by query cluster and page. Record impressions, clicks, CTR, and average position, with the revision dates. Use GA4 organic landing-page engagement and outbound clicks to app.pocketshell.io as supplementary signals for visitors who consent to analytics; an outbound click is not a completed signup.

Prioritize recurring impressions with positions around 5–20 and clear product relevance. Judge broad terms with poor ranks over a longer period. Do not rewrite titles repeatedly based on 1–5 impressions. Capture another dated snapshot when reviewing; no recurring automation is created by this note.
