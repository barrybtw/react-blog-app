//React

import "./faq.scss";

//
export const Faq = () => {
  return (
    <section className="faq__container">
      <div className="faq__header">
        <div className="faq__title">FREQUENTLY ASKED QUESTIONS</div>
        <div className="faq__desc">
          <span>
            <span className="stroke">Got</span> a question?
          </span>
          <span>
            We're here to <span className="stroke">answer!</span>
          </span>
        </div>
      </div>
      <div className="faq__cards">
        <div className="faq__card faq__card-1">
          <h1 className="faq__card-title">
            How do I <span className="stroke">login?</span>
          </h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
        <div className="faq__card faq__card-2">
          <h1 className="faq__card-title">
            Can i login with my <span className="stroke">email?</span>{" "}
          </h1>
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
        <div className="faq__card faq__card-5">
          <h1 className="faq__card-title">QUESTION</h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
        <div className="faq__card faq__card-6">
          <h1 className="faq__card-title">QUESTION</h1>
          <p className="faq__card-answer">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ab ipsa veniam odit unde voluptate dolorem soluta,
            dolorum cumque inventore.
          </p>
        </div>
      </div>
      <div className="contact__card"></div>
    </section>
  );
};
