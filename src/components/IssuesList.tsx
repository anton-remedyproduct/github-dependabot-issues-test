const STATES_DESCRIPTION = {
  open: "opened",
  fixed: "closed as fixed",
  dismissed: "closed as dismissed",
  auto_dismissed: "closed as auto-dismissed",
};

const DATE_BY_STATUS = {
  open: "created_at",
  fixed: "fixed_at",
  dismissed: "dismissed_at",
  auto_dismissed: "auto_dismissed_at",
};

function getIssueStateString(item) {
  try {
    const state = STATES_DESCRIPTION[item.state];
    const date = new Date(
      item[DATE_BY_STATUS[item.state]]
    ).toLocaleDateString();
    return `${state} ${date}`;
  } catch (e) {
    return e?.message || "error";
  }
}

function IssuesList({ data }) {
  return data.value.map((item, i) => {
    const { html_url, security_advisory, number, dependency } = item;
    return (
      <div
        key={number}
        class={`border border-[#d8dee4] px-3 py-2 border-t-${
          i === 0 ? "1" : "0"
        }`}
      >
        <div>
          <a
            href={html_url}
            target="_blank"
            class="text-black font-semibold hover:underline hover:text-[#0969da]"
          >
            {security_advisory?.summary}
          </a>
        </div>
        <div class="flex mt-1 text-[#2e3338] text-xs">
          <span class="mr-1">{`#${number}`}</span>
          <span>{getIssueStateString(item)}</span>
          <span class="mx-1">•</span>
          <span>
            Detected in {dependency?.package?.name} (
            {dependency?.package?.ecosystem})
          </span>
          <span class="mx-1">•</span>
          <span>{dependency.manifest_path}</span>
        </div>
      </div>
    );
  });
}

export default IssuesList;
