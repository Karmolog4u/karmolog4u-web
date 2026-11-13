import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDOMTestUtils from 'react-dom/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import Price from '@/components/Cabinet/DashBoard/Admin/Main/Products/Meditations/AddMeditation/ClosedPart/Price/Price';

// React 18 містить act і Simulate у test-utils; Reflect уникає хибного deprecated-попередження від типів React 19.
const act = Reflect.get(ReactDOMTestUtils, 'act');
const Simulate = Reflect.get(ReactDOMTestUtils, 'Simulate');

vi.mock('@/app/[locale]/layout', () => ({ open_Sans: { className: 'open-sans' } }));
vi.mock(
  '@/components/Cabinet/DashBoard/Admin/Main/Products/Meditations/AddMeditation/ClosedPart/Price/DiscountCalendar',
  () => ({ default: () => null })
);
vi.mock(
  '@/components/Cabinet/DashBoard/Admin/Main/Products/Meditations/AddMeditation/ClosedPart/Price/DeleteDiscountButton',
  () => ({ default: () => null })
);

const mountedRoots = [];

// Обгортаємо компонент у react-hook-form, бо Price читає дані через FormProvider.
function PriceForm({ defaultValues = { price: '50', discount: '' } }) {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <Price />
    </FormProvider>
  );
}

function renderPrice(defaultValues) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  mountedRoots.push({ root, container });
  // act застосовує оновлення React до того, як тест перевірить DOM.
  act(() => root.render(<PriceForm defaultValues={defaultValues} />));
  return container;
}

afterEach(() => {
  // Розмонтовуємо компоненти після кожного тесту, щоб вони не впливали одне на одного.
  mountedRoots.splice(0).forEach(({ root, container }) => {
    act(() => root.unmount());
    container.remove();
  });
});

describe('Price discount input', () => {
  it('limits the discount value to the original price', () => {
    const container = renderPrice();
    const addDiscountButton = container.querySelector('button');

    // Спочатку відкриваємо поле знижки.
    act(() => addDiscountButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    const discountInput = container.querySelector('input[type="text"]');
    // Вводимо 75 при початковій ціні 50: компонент має обмежити значення до 50.
    act(() => {
      discountInput.value = '75';
      Simulate.change(discountInput);
    });

    expect(discountInput.value).toBe('50');
    expect(container.textContent).toContain('100');
  });

  it('keeps a discount equal to the original price', () => {
    // Перевіряємо допустиму межу: знижка може дорівнювати початковій ціні.
    const container = renderPrice({ price: '50', discount: '50' });

    expect(container.textContent).toContain('100');
    expect(container.querySelector('input[type="text"]').value).toBe('50');
  });
});
