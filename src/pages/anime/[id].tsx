import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import styles from '@/styles/anime.module.scss';

import { animeData } from '@/lib/types';

import Layout from '@/components/layout/Layout';
import Skeleton from '@/components/Skeleton';

export default function Anime() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [animeDetails, setAnimeDetails] = React.useState<animeData>();
  const [animeID, setAnimeID] = React.useState(router.query.id as string);

  React.useEffect(() => {
    setAnimeID(router.query.id as string);
  }, [router]);

  React.useEffect(() => {
    fetch('https://api.jikan.moe/v4/anime/' + animeID)
      .then((res) => res.json())
      .then((data) => {
        setAnimeDetails(data.data);
        setLoading(false);
      });
  }, [animeID]);

  return (
    <Layout>
      <main className='layout'>
        <header>
          <h1>
            {loading ? <Skeleton className='h-[40px]' /> : animeDetails?.title}
          </h1>
        </header>
        <section className={styles.anime}>
          <div className={styles.sidebar}>
            {loading ? (
              <Skeleton className='h-[300px] w-[200px]' />
            ) : (
              <Image
                src={animeDetails?.images?.jpg?.image_url as string}
                alt='anime'
                width={200}
                height={300}
              />
            )}
            <div className={styles.alternativeTitles}>
              {loading ? (
                <Skeleton className='mt-2 h-[28px]' />
              ) : (
                <h4>Alternative Titles</h4>
              )}

              {loading ? (
                <Skeleton className='mt-2 h-[28px]' />
              ) : (
                animeDetails?.title_japanese && (
                  <div>{'Japanese : ' + animeDetails?.title_japanese}</div>
                )
              )}
              {loading ? (
                <Skeleton className='mt-2 h-[28px]' />
              ) : (
                animeDetails?.title_english && (
                  <div>{'English : ' + animeDetails?.title_english}</div>
                )
              )}
              {loading ? (
                <Skeleton className='mt-2 h-[28px]' />
              ) : (
                animeDetails?.title_synonyms?.length != 0 && (
                  <div>
                    {'Synonyms : ' + animeDetails?.title_synonyms.join(', ')}
                  </div>
                )
              )}
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.mainInfo}>
              <div className={styles.score}>
                <div className={styles.scoreText}>
                  {loading ? <Skeleton className='h-[24px]' /> : 'Score'}
                </div>
                <div className={styles.scoreValue}>
                  {loading ? (
                    <Skeleton className='h-[24px]' />
                  ) : (
                    animeDetails?.score
                  )}
                </div>
                <div className={styles.users}>
                  {loading ? (
                    <Skeleton className='h-[24px]' />
                  ) : (
                    animeDetails?.scored_by
                  )}
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.topInfo}>
                  <div className={styles.rank}>
                    {loading ? (
                      <Skeleton className='h-[24px] w-[200px]' />
                    ) : (
                      'Rank #' + animeDetails?.rank
                    )}
                  </div>
                  <div className={styles.popularity}>
                    {loading ? (
                      <Skeleton className='h-[24px] w-[200px]' />
                    ) : (
                      'Popularity #' + animeDetails?.popularity
                    )}
                  </div>
                  <div className={styles.members}>
                    {loading ? (
                      <Skeleton className='h-[24px] w-[200px]' />
                    ) : (
                      'Members ' + animeDetails?.members
                    )}
                  </div>
                </div>
                <div className={styles.bottomInfo}>
                  <div className={styles.season}>
                    {loading ? (
                      <Skeleton className='h-[16px] w-[50px]' />
                    ) : (
                      animeDetails?.season + ' ' + animeDetails?.year
                    )}
                  </div>
                  <div className={styles.type}>
                    {loading ? (
                      <Skeleton className='h-[16px] w-[50px]' />
                    ) : (
                      animeDetails?.type
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.youtube}>
              {loading ? (
                <Skeleton className='h-[315px] w-[560px]' />
              ) : (
                <iframe
                  width='560'
                  height='315'
                  src={animeDetails?.trailer?.embed_url}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className={styles.synopsis}>
              {loading ? (
                <>
                  <Skeleton className='mt-1 h-[24px]' />
                  <Skeleton className='mt-1 h-[24px]' />
                  <Skeleton className='mt-1 h-[24px]' />
                </>
              ) : (
                animeDetails?.synopsis
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
