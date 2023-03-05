import type { ChangeEventHandler, FC } from 'react';
import { useState } from 'react';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import styles from './OrderForm.module.css';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<OrderFormValue>({ city: '', prefecture: '', streetAddress: '', zipCode: '' });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleZipcodeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const zipCode = event.target.value;
    setForm({ ...form, zipCode: event.target.value });
    if (zipCode.length !== 7) return;

    fetch(`/api/zipcode?zipcode=${zipCode}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((address: string[]) => {
        const prefecture = address.shift();
        const city = address.join(' ');
        setForm((prev) => ({ ...prev, city, prefecture: prefecture ?? '' }));
      });
  };

  return (
    <div className={styles.container}>
      <form action="#" className={styles.form} data-testid="order-form" onSubmit={handleSubmit}>
        <div className={styles.inputList}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleZipcodeChange}
            placeholder="例: 1500042"
            value={form.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={(e) => setForm((prev) => ({ ...prev, prefecture: e.target.value }))}
            placeholder="例: 東京都"
            value={form.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
            placeholder="例: 渋谷区宇田川町"
            value={form.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={(e) => setForm((prev) => ({ ...prev, streetAddress: e.target.value }))}
            placeholder="例: 40番1号 Abema Towers"
            value={form.streetAddress}
          />
        </div>
        <div className={styles.purchaseButton}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
