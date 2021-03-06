//React

import { useRef, useState } from "react";
import "./faq.scss";

import emailjs from "emailjs-com";

//
export const Faq = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  const serviceID = "service_w2maars";
  const templateID = "template_q0f820h";
  const userID = "user_ULkTbFhXx27CetTfYChwV";
  const sendMail = (event) => {
    event.preventDefault();

    emailjs.sendForm(serviceID, templateID, form.current, userID).then(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    setName("");
    setMail("");
    setMessage("");
  };

  return (
    <section className="faq__container">
      <div className="faq__header">
        <div className="faq__desc">
          <span>
            <span className="stroke">Have</span> a question?
          </span>
          <span>
            We're here to <span className="stroke">answer!</span>
          </span>
        </div>
        <div className="faq__title">FREQUENTLY ASKED QUESTIONS</div>
      </div>
      <div className="faq__cards">
        <div className="faq__card faq__card-1">
          <h1 className="faq__card-title">
            How do I <span className="stroke-small">login?</span>
          </h1>
          <p className="faq__card-answer">
            You login to our website by clicking the button in the top right
            hand corner. This will initially open as a google login which is the
            only way to access our site's full user experience.
          </p>
        </div>
        <div className="faq__card faq__card-2">
          <h1 className="faq__card-title">
            Can i login with my <span className="stroke-small">email?</span>
          </h1>
          <p className="faq__card-answer">
            No, we as a website have chosen to only operate using the google
            login method. You can find said login button in the top right hand
            corner of the website.
          </p>
        </div>
        <div className="faq__card faq__card-3">
          <h1 className="faq__card-title">
            Is my data <span className="stroke-small">safe?</span>
          </h1>
          <p className="faq__card-answer">
            Yes, your user data is very safe with us, and all data which we
            collect is your email, your google profile picture, your name, and
            any posts which you may make during your stay.
          </p>
        </div>
        <div className="faq__card faq__card-4">
          <h1 className="faq__card-title">
            How do i make a <span className="stroke-small">blog post?</span>
          </h1>
          <p className="faq__card-answer">
            Users are free to make as many posts as they like, said posts can
            only be made by users who have logged in through our google login
            process. To make a post you will have to go to the 'Create a blog'
            site and input a title and a description, optionally an image.
          </p>
        </div>
        <div className="faq__card faq__card-5">
          <h1 className="faq__card-title">
            Who <span className="stroke-small">developed</span> this website?
          </h1>
          <p className="faq__card-answer">
            This website was build with React as front-end and Firebase as
            back-end by two developers, Jawad and Nicolai.
          </p>
        </div>
        <div className="faq__card faq__card-6">
          <h1 className="faq__card-title">
            What is your <span className="stroke-small">favorite quote?</span>
          </h1>
          <p className="faq__card-answer">
            Twenty years from now you will be more disappointed by the things
            that you didn't do than by the ones you did do. So, throw off the
            bowlines, sail away from safe harbor, catch the trade winds in your
            sails. Explore, Dream, Discover.
            <br />
            <br />- Mark Twain
          </p>
        </div>
      </div>
      <div className="contact__section">
        <h1 className="contact__title">CONTACT US</h1>
        <form
          action=""
          className="contact__form"
          ref={form}
          id="form"
          onSubmit={sendMail}
        >
          <div className="contact__form-left contact__form--part">
            <div className="contact__form-field contact__form-name">
              <label htmlFor="">NAME</label>
              <textarea
                type="text"
                placeholder="Begin writing..."
                required={true}
                name="from_name"
                className="letterspacing-fix"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="contact__form-field contact__form-email">
              <label htmlFor="">EMAIL</label>
              <input
                type="email"
                placeholder="Begin writing..."
                className="input--fix letterspacing-fix"
                required={true}
                name="user_email"
                value={mail}
                onChange={(event) => setMail(event.target.value)}
              />
            </div>
            <div className="contact__form-field contact__form-message">
              <label htmlFor="">MESSAGE</label>
              <textarea
                type="text"
                placeholder="Begin writing..."
                required={true}
                name="message"
                className="contact__form--input-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <button type="submit" form="form" className="contact__form-submit">
              CONTACT US
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
