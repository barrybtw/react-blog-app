//React

import "./faq.scss";
import Background from "./../../assets/faq.jpg";

//
export const Faq = () => {
  return (
    <section className="faq__container">
      <div className="faq__header">
        <div className="faq__title">FREQUENTLY ASKED QUESTIONS</div>
        <div className="faq__desc">
          <span>
            <stroke>Got</stroke> a question?
          </span>
          <span>
            We're here to <stroke>answer!</stroke>
          </span>
        </div>
      </div>
      <div className="faq__cards">
        <div className="faq__card faq__card-1">
          <h1 className="faq__card-title">QUESTION</h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
        <div className="faq__card faq__card-2">
          <h1 className="faq__card-title">QUESTION</h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
        <div className="faq__card faq__card-3">
          <h1 className="faq__card-title">QUESTION</h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
        <div className="faq__card faq__card-4">
          <h1 className="faq__card-title">QUESTION</h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
      </div>
    </section>
  );
};
