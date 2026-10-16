# PocketShell Search Console review for October 16 2026

Keep the mobile SSH guide first in the editorial queue, move authorized_keys ahead of the broad configuration rewrite, and expand the config guide around examples. The current report contains 99 disclosed queries and 214 query impressions, all with zero clicks. Property totals are 740 impressions and 8 clicks.

## Reporting scope

Captured on October 16 2026 from the [domain performance report](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Apocketshell.io&metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION&start_date=20260917&end_date=20261014). Search type: Web. Exact requested window: September 17 through October 14 2026 inclusive, 28 days. No query, page, country, device, or search appearance filters; no table row filter. All four metrics enabled, table expanded to 100 rows, showing 1–99 of 99. Last update: 5.5 hours before capture.

The 28-day preset and explicit custom dates produced the same totals and queries. The chart displays September 23 through October 14; no earlier dates appear in the chart. Treat this as a 28-day requested window with shorter available chart coverage, rather than assuming the omitted earlier days have confirmed zero traffic.

| Property metric | Value |
|---|---:|
| Clicks | 8 |
| Impressions | 740 |
| CTR | 1.1% |
| Average position | 22.8 |

Disclosed rows account for 214 impressions (28.9% of property impressions) and no clicks. The other 526 impressions and all 8 clicks cannot be attributed to specific queries from this table. Search Console includes anonymized queries in totals while omitting them from the table; other reporting limits can also contribute. See [Google's explanation](https://support.google.com/webmasters/answer/17011259?hl=en). Do not infer that the site received no organic clicks or assign the clicks to a visible query.

## Comparison with October 2

The [October 2 baseline](search-console-2026-10-02.md) selected last 3 months and displayed September 23–29, with 28 disclosed queries, 55 query impressions, 235 property impressions and 3 clicks. This capture uses a different, overlapping window and longer available coverage. The additional 71 disclosed terms are newly observed in our notes, not proven new demand; counts and average-position changes are descriptive observations, not equal-period growth rates or effects of site edits. There is no earlier equivalent 28-day saved snapshot. This capture establishes the dated 28-day baseline for subsequent reviews, whose windows will overlap when collected fortnightly.

| Query | October 2 impressions / position | October 16 impressions / position | Interpretation |
|---|---|---|---|
| ssh on ipad | 5 / 9.4 | 8 / 9.9 | Remains near first-page boundary; strongest recurring opportunity. |
| ssh from ipad | 4 / 10.3 | 4 / 10.3 | Same reported count and position across unequal windows. |
| ipad ssh | 2 / 10.0 | 3 / 9.7 | Another recurring mobile term near position 10. |
| ssh config | 5 / 83.4 | 27 / 82.2 | More observed impressions, still a low broad-term ranking. |
| authorized keys ssh | 3 / 41.7 | 12 / 44.8 | More observed impressions; no ranking improvement established. |
| authorized keys | 2 / 50.0 | 10 / 51.5 | Repeated intent merits clearer setup coverage. |
| ssh authorized_keys | Not disclosed | 9 / 25.7 | Newly observed spelling variant; prioritize exact topic coverage. |

## Editorial priorities

1. **Mobile SSH remains first.** Improve `/blog/ssh-from-ipad-iphone/` with a direct answer and native-app/browser paths near the top. The existing heading and paragraph still imply an app is required; revise those together when editing. Four iPad queries have 17 impressions combined at average positions 9.7–10.3. Newly observed `can i ssh from iphone` has one impression at 11.0: useful FAQ wording, not enough to drive a separate page. Five PuTTY-on-iOS/iPad variants have one impression each, supporting a short alternatives section in the existing guide after verifying current product claims. Keep the URL and strengthen relevant internal links.
2. **Move authorized_keys to second.** `authorized keys ssh`, `authorized keys`, `ssh authorized_keys`, and `ssh authorized keys` together have 40 impressions. Add an upfront location/setup section to `/blog/ssh-authorized-keys-hardening/`, distinguishing the server user's public-key file from the client's private key. Explicitly cover location, file format, installation, permissions, and common singular/plural filename confusion. Preserve existing hardening content and verify technical instructions before publication. The guide currently proceeds straight into key generation; this is a useful structural improvement without a competing article.
3. **Configuration remains third, focused on examples.** `ssh config` has 27 impressions at 82.2; broad visibility alone does not justify a title chase. Newly observed `sample ssh config file` (4, 69.0), `ssh config file example` (3, 82.0), and `.ssh config file example` (1, 9.0) reinforce copyable examples and clear create/edit steps in `/blog/ssh-config-file/`. The existing working example already covers Host and IdentityFile; explain it more directly and make locations, comments, IdentitiesOnly, and Include easy to scan. A single impression at position 9 does not establish stable ranking. Verify technical claims before editing the public guide.
4. **Watch agent and forwarding intent.** `ssh ai agent` (2, 30.5), `ai agent ssh` (1, 52.0), and `remote environment for coding agents` (1, 56.0) now give limited evidence for the existing agent cluster. Keep it product-relevant and cross-link existing guides. Forwarding/ssh-agent variants mostly sit around positions 70–88; improve existing coverage only after the three priorities above. Do not launch a batch of near-duplicate posts from one-impression terms.

Page targets other than the previously verified `ssh on ipad` association are editorial proposals; this collection did not recheck per-query page attribution. Before a public rewrite, inspect each cluster's landing pages and confirm it is the intended article. No public articles changed during this review.

## Next review

Collect the latest complete 28-day window again in two weeks, preserving exact dates and available chart coverage. Compare only equivalent windows with coverage limitations stated; rolling windows collected two weeks apart overlap. Track cluster impressions, clicks, CTR and positions, and record any article revision dates. Do not claim this review proves traffic growth or a content-change effect. Keep the original October 2 snapshot intact.

## All disclosed queries

| Query | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| ssh config | 0 | 27 | 0% | 82.2 |
| authorized keys ssh | 0 | 12 | 0% | 44.8 |
| authorized keys | 0 | 10 | 0% | 51.5 |
| ssh authorized_keys | 0 | 9 | 0% | 25.7 |
| ssh authorized keys | 0 | 9 | 0% | 47.3 |
| ssh on ipad | 0 | 8 | 0% | 9.9 |
| ssh config file | 0 | 8 | 0% | 87.0 |
| pocket shell os | 0 | 5 | 0% | 5.0 |
| ssh from ipad | 0 | 4 | 0% | 10.3 |
| sample ssh config file | 0 | 4 | 0% | 69.0 |
| ssh configuration file | 0 | 4 | 0% | 85.0 |
| ipad ssh | 0 | 3 | 0% | 9.7 |
| ssh iphone | 0 | 3 | 0% | 36.0 |
| ssh ssh config | 0 | 3 | 0% | 76.7 |
| config file in ssh | 0 | 3 | 0% | 81.3 |
| ssh config file example | 0 | 3 | 0% | 82.0 |
| how to ssh from ipad | 0 | 2 | 0% | 10.0 |
| ssh ai agent | 0 | 2 | 0% | 30.5 |
| authorized_keys location | 0 | 2 | 0% | 40.5 |
| .ssh/authorized_keys | 0 | 2 | 0% | 41.0 |
| ssh from iphone | 0 | 2 | 0% | 46.0 |
| ipad ssh app | 0 | 2 | 0% | 51.0 |
| authorized_key | 0 | 2 | 0% | 60.0 |
| forward agent | 0 | 2 | 0% | 70.0 |
| ssh config example | 0 | 2 | 0% | 74.5 |
| config ssh | 0 | 2 | 0% | 78.0 |
| ssh config identityfile | 0 | 2 | 0% | 78.0 |
| config file ssh | 0 | 2 | 0% | 81.5 |
| ssh forwardagent | 0 | 2 | 0% | 81.5 |
| ssh agent | 0 | 2 | 0% | 85.0 |
| identityfile ssh config | 0 | 2 | 0% | 87.0 |
| sample ssh config | 0 | 2 | 0% | 91.0 |
| pocket shell ios | 0 | 1 | 0% | 3.0 |
| pocketshell | 0 | 1 | 0% | 5.0 |
| pocket ssh | 0 | 1 | 0% | 7.0 |
| .ssh config file example | 0 | 1 | 0% | 9.0 |
| can i ssh from iphone | 0 | 1 | 0% | 11.0 |
| i am using codex | 0 | 1 | 0% | 12.0 |
| webssh ios | 0 | 1 | 0% | 19.0 |
| ssh config file examples | 0 | 1 | 0% | 20.0 |
| ios ssh | 0 | 1 | 0% | 25.0 |
| addkeystoagent | 0 | 1 | 0% | 27.0 |
| putty for ipad | 0 | 1 | 0% | 33.0 |
| putty on ipad | 0 | 1 | 0% | 38.0 |
| putty on iphone | 0 | 1 | 0% | 40.0 |
| .ssh/authorized_key | 0 | 1 | 0% | 41.0 |
| ssh for iphone | 0 | 1 | 0% | 44.0 |
| putty for ios | 0 | 1 | 0% | 46.0 |
| ssh authorized_keys command | 0 | 1 | 0% | 46.0 |
| ssh ipad | 0 | 1 | 0% | 48.0 |
| ssh with iphone | 0 | 1 | 0% | 48.0 |
| authorized_keys permissions | 0 | 1 | 0% | 51.0 |
| ai agent ssh | 0 | 1 | 0% | 52.0 |
| putty ipad | 0 | 1 | 0% | 55.0 |
| remote environment for coding agents | 0 | 1 | 0% | 56.0 |
| ssh config identitiesonly | 0 | 1 | 0% | 60.0 |
| authorized_keys file format | 0 | 1 | 0% | 61.0 |
| man ssh config | 0 | 1 | 0% | 62.0 |
| ai ssh | 0 | 1 | 0% | 63.0 |
| debug3: receive packet: type 51 | 0 | 1 | 0% | 63.0 |
| ssh config man | 0 | 1 | 0% | 63.0 |
| ssh config location | 0 | 1 | 0% | 64.0 |
| authorizedkeyscommand | 0 | 1 | 0% | 65.0 |
| ssh config comment | 0 | 1 | 0% | 66.0 |
| ssh config examples | 0 | 1 | 0% | 68.0 |
| .ssh config | 0 | 1 | 0% | 69.0 |
| edit ssh config file | 0 | 1 | 0% | 70.0 |
| ghost ssh | 0 | 1 | 0% | 71.0 |
| ssh config host | 0 | 1 | 0% | 71.0 |
| ssh.conf | 0 | 1 | 0% | 74.0 |
| ssh config include | 0 | 1 | 0% | 77.0 |
| ssh host file | 0 | 1 | 0% | 77.0 |
| file config ssh | 0 | 1 | 0% | 78.0 |
| ssh_config options | 0 | 1 | 0% | 80.0 |
| forward keys | 0 | 1 | 0% | 81.0 |
| ssh_options | 0 | 1 | 0% | 81.0 |
| ssh authorized_keys file | 0 | 1 | 0% | 82.0 |
| ssh forward agent | 0 | 1 | 0% | 82.0 |
| ssh forwarding agent | 0 | 1 | 0% | 82.0 |
| create ssh config file | 0 | 1 | 0% | 83.0 |
| ssh agent forwarding | 0 | 1 | 0% | 83.0 |
| ssh config include file | 0 | 1 | 0% | 83.0 |
| ssh config linux | 0 | 1 | 0% | 83.0 |
| ssh configs | 0 | 1 | 0% | 85.0 |
| agent ssh | 0 | 1 | 0% | 86.0 |
| ssh agent forward | 0 | 1 | 0% | 86.0 |
| config file for ssh | 0 | 1 | 0% | 87.0 |
| host ssh config | 0 | 1 | 0% | 87.0 |
| ssh-agent forwarding | 0 | 1 | 0% | 87.0 |
| ssh ssh agent | 0 | 1 | 0% | 88.0 |
| ssh settings | 0 | 1 | 0% | 90.0 |
| openssh config | 0 | 1 | 0% | 92.0 |
| ssh client config files | 0 | 1 | 0% | 92.0 |
| ssh host config | 0 | 1 | 0% | 93.0 |
| linux ssh config | 0 | 1 | 0% | 95.0 |
| ssh config files | 0 | 1 | 0% | 97.0 |
| .ssh/config file | 0 | 1 | 0% | 99.0 |
| ssh ssh client config file example | 0 | 1 | 0% | 99.0 |
| remote agents | 0 | 1 | 0% | 100.0 |
