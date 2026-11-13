import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import Price from './Price';

vi.mock('@/app/[locale]/layout', () => ({ open_Sans: { className: 'open-sans' } }));
vi.mock('./DiscountCalendar', () => ({ default: () => null }));
vi.mock('./DeleteDiscountButton', () => ({ default: () => null }));

const mountedRoots = [];

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
  act(() => root.render(<PriceForm defaultValues={defaultValues} />));
  return container;
}

afterEach(() => {
  mountedRoots.splice(0).forEach(({ root, container }) => {
    act(() => root.unmount());
    container.remove();
  });
});

describe('Price discount input', () => {
  it('limits the discount value to the original price', () => {
    const container = renderPrice();
    const addDiscountButton = container.querySelector('button');

    act(() => addDiscountButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    const discountInput = container.querySelector('input[type="text"]');
    act(() => {
      discountInput.value = '75';
      Simulate.change(discountInput);
    });

    expect(discountInput.value).toBe('50');
    expect(container.textContent).toContain('100');
  });

  it('keeps a discount equal to the original price', () => {
    const container = renderPrice({ price: '50', discount: '50' });

    expect(container.textContent).toContain('100');
    expect(container.querySelector('input[type="text"]').value).toBe('50');
  });
});
