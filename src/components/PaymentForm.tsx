import { FormEvent, useState } from "react";
import { TCategory } from "../types";
import { todayISO } from "../format";
import { usePaymentsStore } from "../store";
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories";

export default function PaymentForm() {
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [due, setDue ] = useState(todayISO())
    const [category, setCategory] = useState<TCategory>('video')
    const [error, setError] = useState('');

    const addPayment  = usePaymentsStore((s)=> s.addPayment)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const numAmount = Number(amount.trim().replace(",", "."));

   if (!title.trim()) {
            setError("Введите название подписки")
            return
        }
        if (!Number.isFinite(numAmount) || numAmount <= 0) {
            setError("Укажите корректную цену")
            return
        }
        if (!due) {
            setError("Укажите дату оплаты")
            return
        }

        addPayment({
            title: title.trim(),
            amount: numAmount,
            due,
            category,
        })

        setTitle("")
        setAmount("")
        setError("")
    }
    
   return (
    <form className="box" onSubmit={handleSubmit}>
      <h2 className="h">Новая подписка</h2>

      <label className="field">
        <span>Название</span>
        <input
          type="text"
          placeholder="Например, Figma"
          maxLength={60}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className="two">
        <label className="field">
          <span>Цена, ₽</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Оплатить до</span>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>Категория</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TCategory)}
        >
          {CATEGORY_LIST.map((cat, i) => (
            <option value={cat} key={i}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button className="btn" type="submit">
        Добавить
      </button>
    </form>
    )
}