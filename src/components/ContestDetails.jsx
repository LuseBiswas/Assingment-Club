import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Page, 
  LegacyCard, 
  SkeletonDisplayText,
  Button,
  Badge,
  List,
  Loading,
  Frame,
  Banner
} from '@shopify/polaris';
import { ArrowLeftIcon } from '@shopify/polaris-icons';

const ContestDetails = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://codeforces.com/api/contest.list`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response failed');
        return response.json();
      })
      .then((data) => {
        const selectedContest = data.result.find(
          (contest) => contest.id === parseInt(contestId)
        );
        if (!selectedContest) throw new Error('Contest not found');
        setContest(selectedContest);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [contestId]);

  if (loading) {
    return (
      <Frame>
        <Loading />
        <SkeletonDisplayText size="large" />
      </Frame>
    );
  }

  if (error) {
    return (
      <Page>
        <Banner status="critical">
          {error}
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </Banner>
      </Page>
    );
  }

  const startTime = new Date(contest.startTimeSeconds * 1000).toLocaleString();
  const durationHours = (contest.durationSeconds / 3600).toFixed(2);

  return (
    <Page
      breadcrumbs={[{ content: 'Dashboard', onAction: () => navigate('/') }]}
      title={contest.name}
      titleMetadata={
        <Badge status={contest.phase === 'FINISHED' ? 'success' : 'attention'}>
          {contest.phase}
        </Badge>
      }
    >
      <LegacyCard sectioned>
        <List type="bullet">
          <List.Item>
            <strong>Contest ID:</strong> {contest.id}
          </List.Item>
          <List.Item>
            <strong>Type:</strong> {contest.type}
          </List.Item>
          <List.Item>
            <strong>Start Time:</strong> {startTime}
          </List.Item>
          <List.Item>
            <strong>Duration:</strong> {durationHours} hours
          </List.Item>
          <List.Item>
            <strong>Status:</strong> {contest.frozen ? 'Frozen' : 'Not Frozen'}
          </List.Item>
        </List>
      </LegacyCard>

      <div style={{ marginTop: '1rem' }}>
      <Button
  icon={ArrowLeftIcon}
  onClick={() => navigate('/')}
>
  Back to Dashboard
</Button>
      </div>
    </Page>
  );
};

export default ContestDetails;