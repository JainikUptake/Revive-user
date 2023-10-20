import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import React from "react";
import { Container } from "reactstrap";
import "./setting.css";

const Contact = () => {
  return (
    <Container>
      <center>
        <h5 className="contact-header">Contact Us</h5>
      </center>
      <ul className="contact-list">
        <li className="contact-item mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14687.444435407484!2d72.57963285000001!3d23.02887135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1696940897259!5m2!1sen!2sin"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </li>
        <li className="contact-item mt-4">
          1-2 ABC, Lorem Society, ABVP Road, Ahmedabad, Gujarat, Surat
        </li>
        <li className="contact-item mt-4">
          <Phone /> 9924747793
        </li>
        <li className="contact-item mt-4">
          <Mail /> siddharthsoni3333@gmail.com
        </li>
        <li className="contact-item mt-4">
          <span>Follow us on -</span>
          <Twitter className="social-icon" />
          <Facebook className="social-icon" />
          <Instagram className="social-icon" />
        </li>
      </ul>
    </Container>
  );
};

export default Contact;
