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
    </section>
  );
};
