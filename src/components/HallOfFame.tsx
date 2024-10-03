'use client';

import { useState } from 'react';

import { ArrowBack, ArrowForward } from '@mui/icons-material';

import styles from './hallOfFame.module.css';

const images = [
  {
    id: 1,
    src: '/assets/images/2023_men.jpg',
    description:
      '2023 Mens Champions - Team DFN Tapro A (DirectFN). This team showcased exceptional skill and teamwork throughout the tournament, emerging as the top contenders and securing the championship title for the year 2023.',
  },
  {
    id: 2,
    src: '/assets/images/2023_women.jpg',
    description:
      "2023 Champions (Women) - Creative (Creative Software Pvt Ltd). The women's team from Creative Software Pvt Ltd demonstrated outstanding performance and resilience, earning them the championship title in the 2023 tournament.",
  },
  {
    id: 3,
    src: '/assets/images/2022_men_virtusa.jpg',
    description:
      '2022 - Joint Champions (Men) - Virtusa Pvt Ltd. In a thrilling finale, Virtusa Pvt Ltd shared the championship title with another top-performing team, showcasing their prowess and sportsmanship in the 2022 tournament.',
  },
  {
    id: 4,
    src: '/assets/images/2022_men_creative.jpg',
    description:
      "2022 - Joint Champions (Men) - Creative Software Pvt Ltd. Creative Software Pvt Ltd displayed remarkable talent and strategy, earning them a joint championship title in the 2022 men's tournament.",
  },
  {
    id: 5,
    src: '/assets/images/2022_women.jpg',
    description:
      "2022 - Champions (Women) - FIT BATCH 18. The women's team from FIT BATCH 18 dominated the 2022 tournament with their exceptional skills and teamwork, securing the championship title for the year.",
  },
];
const HallOfFame = () => {
  const [items, setItems] = useState(images);

  const handleNext = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const firstItem = newItems.shift();
      if (firstItem) newItems.push(firstItem);
      return newItems;
    });
  };

  const handlePrev = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const lastItem = newItems.pop();
      if (lastItem) newItems.unshift(lastItem);
      return newItems;
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hall of Fame</h1>

      <div className={styles.slide}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={styles.item}
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <div className={styles.content}>
              <div className={styles.des}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={handlePrev}>
          <ArrowBack className={styles.icon}/>
        </button>
        <button onClick={handleNext}>
          <ArrowForward className={styles.icon}/>
        </button>
      </div>
    </div>
  );
};

export default HallOfFame;
