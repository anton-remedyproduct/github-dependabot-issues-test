import { computed } from "@preact/signals";
import Spinner from "react-bootstrap/Spinner";
import {
  data,
  errorMsg,
  isLoading,
  getIssuesData,
} from "../../common/gitHubData";
import GitHubParamsForm from "../../components/GitHubParamsForm";
import IssuesList from "../../components/IssuesList";

export function Home() {
  const openIssues = computed(() =>
    data.value.filter((item) => item.state === "open")
  );

  const closedIssues = computed(() =>
    data.value.filter((item) => item.state !== "open")
  );

  return (
    <div class="container mx-auto p-6 max-w-4xl">
      <h1 class="text-2xl mb-6 font-semibold">GitHub Dependabot Issues</h1>
      <GitHubParamsForm onSubmit={getIssuesData} isLoading={isLoading.value} />
      <section class="mt-10">
        {!!errorMsg && <div class="text-red-600">{errorMsg}</div>}
        {!!openIssues.value.length && (
          <div class="mb-6">
            <h2 class="font-semibold text-xl mb-2">Open</h2>
            <IssuesList data={openIssues} />
          </div>
        )}
        {!!closedIssues.value.length && (
          <div class="mb-6">
            <h2 class="font-semibold text-xl mb-2">Closed</h2>
            <IssuesList data={closedIssues} />
          </div>
        )}
      </section>
      {isLoading.value && (
        <div class="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
