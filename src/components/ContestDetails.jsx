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
  Banner,
  Text
} from '@shopify/polaris';
import { ArrowLeftIcon, ClockIcon, CalendarIcon } from '@shopify/polaris-icons';

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
        <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
          <Loading />
          <div className="w-2/3 max-w-2xl">
            <SkeletonDisplayText size="large" />
            <div className="mt-4 space-y-2">
              {[...Array(4)].map((_, index) => (
                <SkeletonDisplayText key={index} size="small" />
              ))}
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  if (error) {
    return (
      <Page>
        <div className="max-w-2xl mx-auto mt-8">
          <Banner status="critical" className="mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm font-medium">{error}</p>
              <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
            </div>
          </Banner>
        </div>
      </Page>
    );
  }

  const startTime = new Date(contest.startTimeSeconds * 1000).toLocaleString();
  const durationHours = (contest.durationSeconds / 3600).toFixed(2);

  const getStatusColor = (phase) => {
    switch (phase) {
      case 'FINISHED': return 'success';
      case 'CODING': return 'attention';
      case 'PENDING': return 'info';
      default: return 'new';
    }
  };

  return (
    <Page
      breadcrumbs={[{ content: 'Dashboard', onAction: () => navigate('/') }]}
      title={contest.name}
      titleMetadata={
        <Badge status={getStatusColor(contest.phase)}>
          {contest.phase}
        </Badge>
      }
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6">
          {/* Main Info Card */}
          <LegacyCard>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Contest Overview */}
                <div className="space-y-4">
                  <div>
                    <Text as="h3" variant="headingMd" className="mb-2">Contest Details</Text>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">ID:</span>
                      <span className="text-sm text-gray-900">{contest.id}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm font-medium text-gray-500">Type:</span>
                      <Badge status="info">{contest.type}</Badge>
                    </div>
                  </div>
                </div>

                {/* Time Information */}
                <div className="space-y-4">
                  <div>
                    <Text as="h3" variant="headingMd" className="mb-2">Time Information</Text>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-900">{startTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-900">{durationHours} hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LegacyCard>

          {/* Additional Information */}
          <LegacyCard>
            <div className="p-6">
              <Text as="h3" variant="headingMd" className="mb-4">Additional Information</Text>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <Badge status={contest.frozen ? 'attention' : 'success'}>
                    {contest.frozen ? 'Frozen' : 'Not Frozen'}
                  </Badge>
                </div>
              </div>
            </div>
          </LegacyCard>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Button
            icon={ArrowLeftIcon}
            onClick={() => navigate('/')}
            className="hover:bg-gray-50"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default ContestDetails;