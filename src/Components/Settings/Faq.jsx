import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Container,
} from "reactstrap";
import { Baseurl } from "../url/BaseURL";

const Faq = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  // Start
  const [faq, setFaq] = useState([]);

  async function getAllFaq() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(`${Baseurl}/faqs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter FAQ with status 1
      const filteredFaq = response.data.data.filter((faq) => faq.status === 1);

      setFaq(filteredFaq);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFaq();
  }, []);

  console.log(faq, "faq");
  // End

  return (
    <Container>
     <center><h5 className="mb-4">FAQ</h5></center> 
      <div>
        <Accordion open={open} toggle={toggle}>
          {faq?.map((item) => (
            <AccordionItem  key={item.id} className="custom-accordion-item">
              <AccordionHeader targetId={item.id.toString()}>
                {item.question}
              </AccordionHeader>
              <AccordionBody accordionId={item.id.toString()}>
                <strong>{item.answer}</strong>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default Faq;
