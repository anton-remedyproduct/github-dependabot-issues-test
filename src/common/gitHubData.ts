import { signal } from "@preact/signals";

export const data = signal([]);
export const errorMsg = signal("");
export const isLoading = signal(false);

export async function getIssuesData({
  owner,
  repo,
  token,
}: {
  owner: string;
  token: string;
  repo: string;
}) {
  try {
    isLoading.value = true;
    data.value = [];
    errorMsg.value = "";

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/dependabot/alerts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson?.message);
    }

    data.value = responseJson;
    isLoading.value = false;
  } catch (e) {
    errorMsg.value = e?.message;
    isLoading.value = false;
  }
}
