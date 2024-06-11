import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './faq.css';

function Faq() {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/getFaqs')
            .then(response => setFaqs(response.data))
            .catch(err => console.log(err));
    }, []);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className='faq-wrapper'>
            <div className='faq-container'>
                <div className='faq-header'>
                    <h1>Any questions? We got you.</h1>
                    <p>Find answers to all your questions. We've compiled the most common inquiries for you to be able to find the information you need, all in one place.</p>
                    <a href="/support/contactus">Didn't find the answer you're looking for?</a>
                </div>
                <div className='faq-list-container'>
                    <div className='faq-list'>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAnswer(index)}
                            >
                                <div className='faq-question'>
                                    <span className='faq-toggle'>{activeIndex === index ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}</span>
                                    {faq.Question}
                                </div>
                                {activeIndex === index && (
                                    <div className='faq-answer'>
                                        {faq.Answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Faq;
