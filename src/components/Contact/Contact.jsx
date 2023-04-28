import { useRef } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        "service_3bb7t4o",
        "template_s3lrvff",
        form.current,
        "s0CZa7H54C-IGZ2Cx"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="contact">
      <form className="contentBox" ref={form} onSubmit={sendEmail}>
        <div className="formBox" style={{ marginTop: 50 }}>
          <h2>Contact</h2>
          <div className="inputBox">
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="inputBox">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Your active email"
              required
            />
          </div>
          <div className="inputBox">
            <label>Subject</label>
            <input type="text" name="subject" placeholder="Subject" required />
          </div>
          <label>Message</label>
          <textarea
            name="message"
            cols="30"
            rows="4"
            placeholder="Message"
          ></textarea>
          <button>Send Message</button>
        </div>
      </form>

      <div className="contentBox bg-image">
        <div className="formBox" style={{ marginLeft: 100, width: "100%" }}>
          <h2>Contact Information</h2>
          <h4>Fill the form or contact us via other channels listed below</h4>
          <div className="icons mt-[80px]">
            <span className="flex mb-[15px] ">
              <FaPhoneAlt />
              <p>+0123 456 7890</p>
            </span>
            <span className="flex mb-[15px]">
              <FaEnvelope />
              <p>Support@rentRoom.com</p>
            </span>
            <span className="flex mb-[15px]">
              <GoLocation />
              <p>Da Nang, Viet Nam</p>
            </span>
            <span className="flex mb-[15px]">
              <FaTwitter />
              <p>@vuhuong</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
