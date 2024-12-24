import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Page,
  LegacyCard,
  Filters,
  DataTable,
  Pagination,
  Select,
  Loading,
  Frame,
  Badge,
  Button,
  Icon,
  Text
} from '@shopify/polaris';
import { StarIcon } from '@shopify/polaris-icons';
import { fetchContests } from "../utils/fetchContests";
import Graph from "./components/Graph";
import ContestDetails from "./components/ContestDetails";


function App() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetchContests()
      .then((data) => {
        setContests(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Filter and search logic
  const filteredContests = contests.filter((contest) =>
    filter === "FAVORITES"
      ? favorites.includes(contest.id)
      : filter
      ? contest.type === filter
      : true
  ).filter((contest) =>
    contest.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const paginatedContests = filteredContests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Frame>
        <Loading />
      </Frame>
    );
  }

  const filterOptions = [
    {label: 'All', value: ''},
    {label: 'Codeforces', value: 'CF'},
    {label: 'ICPC', value: 'ICPC'},
    {label: 'Favorites', value: 'FAVORITES'}
  ];

  const itemsPerPageOptions = [
    {label: '5 per page', value: '5'},
    {label: '10 per page', value: '10'},
    {label: '15 per page', value: '15'}
  ];

  const rows = paginatedContests.map((contest) => [
    <Link to={`/contest/${contest.id}`}>
      <Text variant="bodyMd" as="span" color="success">
        {contest.name}
      </Text>
    </Link>,
    <Badge status={contest.type === 'CF' ? 'success' : 'info'}>{contest.type}</Badge>,
    <Button
      icon={<Icon source={StarIcon} color={favorites.includes(contest.id) ? "warning" : "subdued"} />}
      onClick={() => toggleFavorite(contest.id)}
      plain
      monochrome
      pressed={favorites.includes(contest.id)}
    />
  ]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Frame>
              <Page title="Codeforces Contest Dashboard - Ritesh Biswas">
                <LegacyCard sectioned>
                  <Filters
                    queryValue={search}
                    queryPlaceholder="Search contests..."
                    onQueryChange={setSearch}
                    filters={[
                      {
                        key: 'type',
                        label: 'Contest Type',
                        filter: (
                          <Select
                            options={filterOptions}
                            value={filter}
                            onChange={setFilter}
                          />
                        ),
                      }
                    ]}
                  />
                </LegacyCard>

                <LegacyCard sectioned>
                  <Graph contests={paginatedContests} />
                </LegacyCard>

                <LegacyCard>
                  <DataTable
                    columnContentTypes={['text', 'text', 'text']}
                    headings={['Contest Name', 'Type', 'Favorite']}
                    rows={rows}
                  />
                  <LegacyCard.Section>
                    <div className="flex items-center justify-between">
                      <Select
                        options={itemsPerPageOptions}
                        value={itemsPerPage.toString()}
                        onChange={(value) => {
                          setItemsPerPage(parseInt(value, 10));
                          setCurrentPage(1);
                        }}
                      />
                      <Pagination
                        hasPrevious={currentPage > 1}
                        hasNext={currentPage < totalPages}
                        onPrevious={() => setCurrentPage(currentPage - 1)}
                        onNext={() => setCurrentPage(currentPage + 1)}
                      />
                    </div>
                  </LegacyCard.Section>
                </LegacyCard>
              </Page>
            </Frame>
          }
        />
        <Route path="/contest/:contestId" element={<ContestDetails contests={contests} />} />
      </Routes>
    </Router>
  );
}

export default App;