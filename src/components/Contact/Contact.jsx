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
    <section>
      <div className="contact">
        <h2>Contact Us</h2>
        <div className="section">
          <form ref={form} onSubmit={sendEmail}>
            <card className="card" style={{ backgroundColor: "blue" }}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button>Send Message</button>
            </card>
          </form>

          <div style={{ backgroundColor: "blue" }} className="details">
            <card className="card2">
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className="icons">
                <span>
                  <FaPhoneAlt />
                  <p>+0123 456 7890</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>Support@rentRoom.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Da Nang, Viet Nam</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@vuhuong</p>
                </span>
              </div>
            </card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
