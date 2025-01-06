import { Octokit } from 'octokit';
const API_KEY = import.meta.env.GITHUB_API_KEY;
const commitTxt = document.querySelector('.info .commit a');

const octokit = new Octokit({
  auth: API_KEY,
});

async function logRepoDetails() {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: 'invisyarcticfox',
      repo: 'astrosite',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const recentCommitHash = res.data[0]?.sha;
    const recentCommitHashShort = recentCommitHash.slice(0, 7);
    commitTxt.textContent = recentCommitHashShort || '#';
    commitTxt.href =
      `https://github.com/invisyarcticfox/astrosite/commit/${recentCommitHash}` ||
      '#';
  } catch (error) {
    console.error('Error fetching repository details:', error);
  }
}

logRepoDetails();