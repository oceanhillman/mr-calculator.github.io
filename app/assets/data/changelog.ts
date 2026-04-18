export interface ChangeLogEntry {
    version: {
        number: string,
        date: string,
        time: string,
        commitSha?: string,
    },
    title: string,
    description?: string,
    listTitle?: string,
    list?: string[],
    images?: string[],
}

export interface GitHubCommit {
    sha: string,
    node_id: string,
    commit: {
        author: {
            name: string,
            email: string,
            date: string
        },
        committer: {
            name: string,
            email: string,
            date: string,
        },
        message: string,
        tree: {
            sha: string,
            url: string,
        },
        url: string,
        comment_count: number,
        verification: {
            verified: boolean,
            reason: string,
            signature: unknown,
            payload: unknown,
            verified_at: unknown
        }
    },
    url: string,
    html_url: string,
    comments_url: string,
    author: string|null,
    committer: string|null,
    parents: [
        {
            sha: string,
            url: string,
            html_url: string,
        }
    ]
}

export const CHANGELOG = (): ChangeLogEntry[] => [
    {
        version: {
            number: '1.0.0',
            date: 'Mar 25, 2026',
            time: '6:19 PM',

            commitSha: '9fa35036fc00681cfe2131d9b2f424b994e4d470'
        },
        title: 'Initial Release',
        description: `The Marvel Rivals Proficiency Calculator allows anyone to calculate the time it takes to reach proficiency reward goals on every hero in the game. With detailed progression and the ability to type in your own stats you are guaranteed to get the most accurate estimates for your playstyle!`,
        listTitle: 'Features',
        list: [
            'All heroes in the game',
            'All rewards for every hero',
            'Calculate based on your own stats',
            'Total, per-rank, and match count time and proficiency points (gain) estimates',
            'Plan your journey to your goal using the planner',
            'Use generic stats for all heroes if you play like the Top 500',
            'Quick Match and Competitive mode estimates',
            'Progression and data is stored permanently on your device',
            'Export/Import your data across devices using .mrprof files',
            'Add heroes if they are missing'
        ],
        images: [
            '/img/seo/og-image.webp',
            '/img/changelog/v1.0.0/hero-page.webp'
        ]
    },
    {
        version: {
            number: '1.1.0',
            date: 'Mar 26, 2026',
            time: '6:50 PM',

            commitSha: '34d3d46a09ccd2914d2bde4d826d6a9510d042e7'
        },
        title: 'Improved Missing Hero Feature',
        description: 'Added ability to convert a user-added missing hero to an existing hero in case it was added in the meantime',
        images: [
            '/img/changelog/v1.1.0/convert-hero.webp'
        ]
    },
    {
        version: {
            number: '1.1.1',
            date: 'Apr 9, 2026',
            time: '9:27 AM',

            commitSha: 'b78d59f61c13088ef155d6587b10c62721128496'
        },
        title: 'Improved Hero Generic Stats Visibility',
        description: 'Added the ability to see generic average stats on a hero\'s page (not only in the landing page)',
        images: [
            '/img/changelog/v1.1.1/hero-stats.webp'
        ]
    },
    {
        version: {
            number: '1.2.0',
            date: 'Apr 10, 2026',
            time: '2:35 AM',

            commitSha: 'd33c80d5e7a3608234b83b82c834c5ae7f8b4959'
        },
        title: 'Arcade Mode',
        description: 'Arcade Mode lets you type in your arcade stats (from any game mode, preferrably 18v18 Annihilation for fastest results) and get detailed estimates on how long it will take to get to your goal by playing arcade instead of Quick/Competitive matches.',
        listTitle: 'Features',
        list: [
            'Set your Arcade average stats per 10 minutes',
            'Personalised estimates (time and match count) for your arcade stats',
            'Planner also includes arcade mode',
            '<i>Arcade Mode <b>does not</b> have generic stats</i>'
        ],
        images: [
            '/img/changelog/v1.2.0/average-stats-modal.webp',
            '/img/changelog/v1.2.0/estimates.webp',
            '/img/changelog/v1.2.0/estimates-rank.webp',
            '/img/changelog/v1.2.0/planner.webp'
        ]
    },
    {
        version: {
            number: '1.2.1',
            date: 'Apr 13, 2026',
            time: '4:39 PM',

            commitSha: '54d7b14284cebb5b22d00c604a50c373d9755305'
        },
        title: 'Added the Changelog',
        description: 'Added this very changelog. You can now see all the updates and additions to the calculator, including new heroes and other QoL changes!',
    },
    {
        version: {
            number: '1.2.2',
            date: 'Apr 14, 2026',
            time: '9:56 AM',

            commitSha: '63955b330a5b3b97768d0f782c19215f50fc6508'
        },
        title: 'QoL changes and bug fixes',
        description: `Made small improvements to the home page, hero pages, and fixed a few issues.
        <br/>
        You can now quickly change your current level by pressing on it!
        `,
        list: [
            'Added "Go to hero" button in the home page under the Generic Hero Stats section',
            'Added a shortcut to changing current level on the hero page by pressing on the level header (below the hero prestige image)',
            'Fixed an issue with the sticky header of the hero list',
            'Fixed an unknown long-standing issue with the active state (on click) of the main tabs on the hero pages. Now it shows a flicker of yellow just like the game client',
            'Fixed an uncaught error with the math-enabled numerical inputs'
        ]
    },
    {
        version: {
            number: '1.2.3',
            date: 'Apr 14, 2026',
            time: '4:43 AM',

            commitSha: 'fb4e0b11a44ff0462f1bb6d4a5c2f46661d2dd83'
        },
        title: 'More QoL changes and bug fixes',
        description: `Improved hero page (again) - it's now easier than ever to change your current level data, no more menu inception.
        <br/>
        Fixed some major issues with importing/downloading data.
        `,
        list: [
            'Added ability to increase the current level by 1 just by pressing on it (now marked with a chevron) - resets proficiency points to 0',
            'Added ability to drag/slide the proficiency points meter to set your proficiency points',
            'Fixed "Download My Data" button downloading the selected hero\'s data instead of all the data when a hero was selected',
            'Fixed Import data page not honoring the user choices of what heroes to overwrite (be it custom hero info or stats)',
            'Added a visual interface to see what heroes are being imported which also allows to filter out heroes (stats or info - for custom heroes) when importing'
        ],
        images: [
            '/img/changelog/v1.2.3/hero.webp',
            '/img/changelog/v1.2.3/import.webp'
        ]
    },
    {
        version: {
            number: '1.2.4',
            date: 'Apr 15, 2026',
            time: '2:12 AM',
            commitSha: '704938b7ed1894289d11f7549122f06bca2485ac'
        },
        title: 'Improved mobile user UI/UX and the Changelog',
        description: `Made certain modifications to the UI and UX of the app on mobile for a smoother experience across all devices
        <br/>
        Improved the changelog to contain GitHub commits and link "major" versions to commits.
        `,
        list: [
            'Centered hero name on hero page',
            'Disabled scrolling when dragging the proficiency slider on mobile',
            'The filtering tools bar now toggles when scrolling up/down in the hero list, so more heroes are visible at once',
            'Added GitHub commits between "major" versions in the changelog and assigned individual commits to a major version. Commits are fetched from GitHub or from a cache in case of rate-limiting of the user by GitHub.'
        ]
    },
    {
        version: {
            number: '1.2.5',
            date: 'Apr 17, 2026',
            time: '4:11 PM',
            commitSha: '658c03706959f0ef790e86ca5bae6e9ce18910d8'
        },
        title: 'Added Black Cat',
        description: `Added Black Cat to the calculator without generic stats (will add later - when averages are more accurate)
        Made slight optimisations and bug fixes.
        Refreshed White Fox generic average stats with data from S7.0.
        Added new hero promotional UI elements to help players more easily get to the new hero's page.
        `,
        list: [
            'Added Black Cat',
            'Refreshed White Fox generic average stats with data from S7.0',
            'Modified add-hero script to allow season selection for data scrape',
            'Added new hero promotional UI elements that show up on the landing and hero list pages',
            'Fixed a hydration issue with the new hero promo role',
            'Fixed hydration issues with the scrolling lord display at the bottom of the landing page',
            'Fixed reactive components when using modals, changed to markRaw',
            'Added a temporary popup to explain the new quick current level/proficiency points editing features on hero pages, which adds a new localStorage preference k/v',
            'Modified import/download pages to accomodate possible version mismatches and resolve them automatically (upgrading older exported data files to the newer version by filling in with defaults)',
            'Modified commit list caching mechanism to use an authenticated GitHub API request, since I literally just got rate limited as writing this'
        ],
        images: [
            '/img/changelog/v1.2.5/black-cat.webp',
            '/img/changelog/v1.2.5/new-hero-promo-landing.webp',
            '/img/changelog/v1.2.5/new-hero-promo-list.webp',
        ]
    },
    {
        version: {
            number: '1.2.6',
            date: 'Apr 17, 2026',
            time: '10:14 PM',
            commitSha: 'cfdcb05a8debe37c7bac67b49cad906a125edf17'
        },
        title: 'Hero Page UI/UX Improvements',
        description: `Reworked the Hero page to have better UX and be less confusing, using more tabs and less hidden menus.`,
        list: [
            'Changed navigation to Overview, Customize, Estimates, Planner',
            'Changed calculator panel to have 2 different states (normal & arcade) for less confusion',
            'Customize page now features everything in the hero settings modal',
            'Added Export Hero button'
        ],
        images: [
            '/img/changelog/v1.2.6/hero-page.webp',
        ]
    },
    {
        version: {
            number: '1.2.7',
            date: 'Apr 18, 2026',
            time: '10:01 PM',
        },
        title: 'Added tooltips',
        description: `Added tooltips to help with UI confusion here and there. Made other small fixes.`,
    }
];

export function groupCommitsByVersion(commits: GitHubCommit[]):
{
    groups: Record<string, GitHubCommit[]>,
    remaining: GitHubCommit[],
    versionCommits: Record<string, GitHubCommit>
} {
    const reverseChangelog = CHANGELOG();
    const reverseCommits = commits.toReversed();
    const groupsByVersion: Record<string, GitHubCommit[]> = {};
    const versionCommits: Record<string, GitHubCommit> = {};

    const remaining: GitHubCommit[] = [];

    let lastCommitIndex = -1;
    for (const entry of reverseChangelog) {
        const version = entry.version.number;
        groupsByVersion[version] = [];

        let indexOfCommit = reverseCommits.findIndex(c => c.sha == entry.version.commitSha);

        if (!entry.version.commitSha) {
            const entryDateAndTime = new Date(entry.version.date + ' ' + entry.version.time + ' UTC+00');            
            let smallestTimeDiff = Number.MAX_SAFE_INTEGER;
            reverseCommits.forEach((c, idx) => {
                const dateOfCommit = new Date(c.commit?.author?.date ?? c.commit?.committer?.date);
                const diff = Math.abs(dateOfCommit.getTime() - entryDateAndTime.getTime());
                if (diff < smallestTimeDiff) {
                    smallestTimeDiff = diff;
                    indexOfCommit = idx;
                }
            });
        }

        for (let i = lastCommitIndex + 1; i < indexOfCommit; i++)
            groupsByVersion[version].push(reverseCommits[i]!);

        lastCommitIndex = indexOfCommit;
        versionCommits[version] = reverseCommits[indexOfCommit]!;
    }

    if (lastCommitIndex < reverseCommits.length - 1)
        remaining.push(...reverseCommits.slice(lastCommitIndex + 1));

    remaining.reverse();

    Object.values(groupsByVersion).forEach(g => g.reverse());

    return {
        groups: groupsByVersion,
        remaining,
        versionCommits,
    }
}