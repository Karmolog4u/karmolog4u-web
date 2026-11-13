import { describe, expect, it } from 'vitest';
import { getRecommendedWebinars } from '@/app/[locale]/(website)/products/courses/[id]/recommendations';

describe('getRecommendedWebinars', () => {
  // Поточний курс: у рекомендаціях мають залишитися курси лише цієї категорії.
  const currentWebinar = { id: 'current', category: 'courses' };

  // Список містить відповідний курс, курс іншої категорії та сам поточний курс.
  const webinars = [
    { id: 'same-category', category: 'courses' },
    { id: 'different-category', category: 'webinars' },
    { id: 'current', category: 'courses' },
  ];

  it('returns only other webinars from the current webinar category', () => {
    // Перевіряємо, що курс іншої категорії та поточний курс відфільтровані.
    expect(getRecommendedWebinars(webinars, currentWebinar)).toEqual([webinars[0]]);
  });

  it('returns an empty list when there is no current webinar', () => {
    // Без поточного курсу функція не має формувати рекомендації.
    expect(getRecommendedWebinars(webinars, null)).toEqual([]);
  });
});
