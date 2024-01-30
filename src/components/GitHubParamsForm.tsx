import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSignal } from "@preact/signals";
import { JSX } from "preact";

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
    <Form onSubmit={onFormSubmit}>
      <Form.Group class="mb-4">
        <Form.Label>Token</Form.Label>
        <Form.Control
          value={token.value}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            (token.value = e.currentTarget.value)
          }
        />
      </Form.Group>
      <div class="flex mb-4 w-full">
        <Form.Group class="mr-4 flex-1">
          <Form.Label>Owner</Form.Label>
          <Form.Control
            value={owner.value}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              (owner.value = e.currentTarget.value)
            }
          />
        </Form.Group>
        <Form.Group class="flex-1">
          <Form.Label>Repository</Form.Label>
          <Form.Control
            value={repo.value}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              (repo.value = e.currentTarget.value)
            }
          />
        </Form.Group>
      </div>
      <Button type="submit" disabled={isDisabled} variant="outline-primary">
        Submit
      </Button>
    </Form>
  );
}

export default GitHubParamsForm;
