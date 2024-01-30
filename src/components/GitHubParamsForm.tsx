import { useSignal } from "@preact/signals";
import { JSX } from "preact";
import { FormLabel, Input, Button } from "@chakra-ui/react";

type GitHubFormParams = {
  onSubmit: ({
    owner,
    token,
    repo,
  }: {
    owner: string;
    token: string;
    repo: string;
  }) => void;
  isLoading: boolean;
};

function GitHubParamsForm({ onSubmit, isLoading }: GitHubFormParams) {
  const token = useSignal("");
  const owner = useSignal("");
  const repo = useSignal("");

  const onFormSubmit = (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ token: token.value, owner: owner.value, repo: repo.value });
  };

  const isDisabled = isLoading || !token.value || !owner.value || !repo.value;

  return (
    <form onSubmit={onFormSubmit}>
      <div class="mb-4">
        <FormLabel>Token</FormLabel>
        <Input
          value={token.value}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            (token.value = e.currentTarget.value)
          }
        />
      </div>
      <div class="flex mb-4 w-full">
        <div class="mr-4 flex-1">
          <FormLabel>Owner</FormLabel>
          <Input
            value={owner.value}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              (owner.value = e.currentTarget.value)
            }
          />
        </div>
        <div class="flex-1">
          <FormLabel>Repository</FormLabel>
          <Input
            value={repo.value}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              (repo.value = e.currentTarget.value)
            }
          />
        </div>
      </div>
      <Button type="submit" isDisabled={isDisabled} isLoading={isLoading}>
        Submit
      </Button>
    </form>
  );
}

export default GitHubParamsForm;
