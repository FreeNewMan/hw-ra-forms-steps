import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


interface IStep {
  id: string;
  stDate: string;
  distance: Number;
}


export function Trainings() {
  const [steps, setStep] = useState<IStep[]>([
    { id: "1", stDate: "20.07.2019", distance: 1.5 },
    { id: "2", stDate: "19.07.2019", distance: 3 },
    { id: "3", stDate: "18.07.2019", distance: 3.1 },
  ]);

  const [form, setForm] = useState({
    dateinput: "", distanceinput: "", stateForm: "add"
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { dateinput, distanceinput } = e.target;

    let chobj = steps.filter((item) => item.stDate === dateinput.value);
    if (chobj.length !== 0) {
      if (form.stateForm === "add") {
        chobj[0].distance += parseFloat(distanceinput.value);
      }
      else {
        chobj[0].distance = parseFloat(distanceinput.value);
      }
    }
    else {
      setStep((p) => [...p, { id: uuidv4(), stDate: dateinput.value, distance: parseFloat(distanceinput.value) }]);
    }

    setForm({ dateinput: "", distanceinput: "", stateForm: "add" });
  };

  const handleStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const removeItem = (id: string) => {
    setStep((prev) => prev.filter((b) => b.id !== id));
  };

  const editItem = (id: string) => {
    let edobj = steps.filter((item) => item.id === id);
    if (edobj.length !== 0) {
      setForm({ dateinput: edobj[0].stDate, distanceinput: edobj[0].distance, stateForm: "edit" });
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} >
        <ul className="formitems">
          <li>
            <label htmlFor="dateinput">Дата (ДД.ММ.ГГГГ)</label>
            <input id="dateinput" name="dateinput" value={form.dateinput} autoComplete="off" onChange={handleStep} />
          </li>
          <li>
            <label htmlFor="distanceinput">Пройдено км</label>
            <input id="distanceinput" name="distanceinput" value={form.distanceinput} autoComplete="off" onChange={handleStep} />
          </li>
          <li>
            <button>OK</button>
          </li>
        </ul>
      </form>
      <ul className="steps">
        {steps
          .sort((a, b) => b.stDate.localeCompare(a.stDate))
          .map((b) => (
            <div className="stepitem" key={b.id}>
              <div className="fielditem">
                {b.stDate}
              </div>
              <div className="fielditem">
                {b.distance}
              </div>
              <div className="fieldaction" key={b.id} onClick={() => editItem(b.id)}>
                ✎
              </div>
              <div className="fieldaction" key={b.id} onClick={() => removeItem(b.id)}>
                ✘
              </div>
            </div>
          ))}
      </ul>
    </>
  );
};


