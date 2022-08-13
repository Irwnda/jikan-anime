import { DatePicker, Pagination, PaginationProps, Select, Slider } from 'antd';
import Image from 'next/image';
import * as React from 'react';

import styles from '@/styles/home.module.scss';

import {
  animeData,
  enumAnimeRating,
  enumAnimeStatus,
  enumAnimeType,
  pagination,
} from '@/lib/types';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';

const { Option } = Select;

export default function HomePage() {
  const [animeType, setAnimeType] = React.useState('');
  const [animeStatus, setAnimeStatus] = React.useState('');
  const [animeRating, setAnimeRating] = React.useState('');
  const [score, setScore] = React.useState([0, 10]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [limit, setLimit] = React.useState(20);
  const [page, setPage] = React.useState(1);

  const [results, setResults] = React.useState<{
    data: animeData[];
    pagination: pagination;
  } | null>(null);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: number,
    pageSize: number
  ) => {
    setPage(current);
    setLimit(pageSize);
    refreshAnime();
  };

  const handlePagination = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
    refreshAnime();
  };

  const refreshAnime = () => {
    const endpoint =
      'https://api.jikan.moe/v4/anime?q=' +
      query +
      (animeType !== '' ? '&type=' + animeType : '') +
      (animeStatus !== '' ? '&status=' + animeStatus : '') +
      (animeRating !== '' ? '&rating=' + animeRating : '') +
      ('&min_score=' + score[0]) +
      ('&max_score' + score[1]) +
      (startDate !== '' ? '&start_date=' + startDate : '') +
      (endDate !== '' ? '&end_date=' + endDate : '') +
      ('&limit=' + limit) +
      ('&page=' + page) +
      '&order_by=mal_id';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleButtonClick = () => {
    setLoading(true);
    refreshAnime();
  };

  return (
    <Layout>
      <main className='layout'>
        <header>
          <h1>Jikan Anime</h1>
        </header>
        <section className={styles.home}>
          <div className={styles.input}>
            <div className={styles.inputGroup}>
              <input
                type='text'
                placeholder='Search anime title'
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />{' '}
              <Button
                variant='dark'
                onClick={handleButtonClick}
                isLoading={loading}
              >
                Search
              </Button>
            </div>
            <div className={styles.filter}>
              <Select
                placeholder='Anime Type'
                onChange={(value) => setAnimeType(value)}
                className={styles.dropdown}
                dropdownClassName={styles.dropdownMenu}
                allowClear
              >
                {Object.keys(enumAnimeType).map((key) => (
                  <Option value={key} key={key}>
                    {enumAnimeType[key as keyof typeof enumAnimeType]}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder='Anime Status'
                onChange={(value) => setAnimeStatus(value)}
                className={styles.dropdown}
                dropdownClassName={styles.dropdownMenu}
                allowClear
              >
                {Object.keys(enumAnimeStatus).map((key) => (
                  <Option value={key} key={key}>
                    {enumAnimeStatus[key as keyof typeof enumAnimeStatus]}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder='Anime Rating'
                allowClear
                onChange={(value) => setAnimeRating(value)}
                className={styles.dropdown}
                style={{ width: '250px' }}
                dropdownClassName={styles.dropdownMenu}
              >
                {Object.keys(enumAnimeRating).map((key) => (
                  <Option value={key} key={key}>
                    {enumAnimeRating[key as keyof typeof enumAnimeRating]}
                  </Option>
                ))}
              </Select>
              <div className={styles.sliderParent}>
                Score
                <Slider
                  range
                  defaultValue={[0, 10]}
                  min={0}
                  max={10}
                  step={0.1}
                  className={styles.slider}
                  onChange={(e) => setScore(e)}
                />
              </div>
              <DatePicker
                onChange={(value) => setStartDate(value?.toString() as string)}
                className={styles.dropdown}
                placeholder='Start Date'
                dropdownClassName={styles.dropdownMenu}
              />
              <DatePicker
                onChange={(value) => setEndDate(value?.toString() as string)}
                className={styles.dropdown}
                placeholder='End Date'
                dropdownClassName={styles.dropdownMenu}
              />
            </div>
          </div>
          <div className={styles.results}>
            {results && (
              <div className={styles.header}>
                <div className={styles.no}>No</div>
                <div className={styles.animeData}>Title</div>
              </div>
            )}
            {results &&
              results.data.map((anime, index) => (
                <div className={styles.content} key={anime.mal_id}>
                  <div className={styles.no}>
                    {index + 1 + limit * (page - 1)}
                  </div>
                  <div className={styles.animeData}>
                    <Image
                      src={anime.images.jpg.image_url}
                      alt='anime'
                      width={150}
                      height={225}
                    />

                    <div className={styles.animeDetails}>
                      <div>
                        <h3 className={styles.title}>{anime.title}</h3>
                        <div className={styles.episode}>
                          {anime.type} {anime.episodes}{' '}
                          {anime.episodes > 1 ? 'episodes' : 'episode'}
                        </div>
                        <div className={styles.synopsis}>{anime.synopsis}</div>
                      </div>
                      <div className={styles.member}>
                        {anime.members}{' '}
                        {anime.members > 1 ? 'members' : 'member'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {results && (
              <div className={styles.pagination}>
                <Pagination
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={1}
                  onChange={handlePagination}
                  total={Math.ceil(results.pagination.items.total / limit)}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
