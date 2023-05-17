import React from "react";
import { useState } from "react";
import {MdWork} from "react-icons/md"
import Job from "./Jobs";
import Link from "next/link";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <Job close={setOpen} />
      ) : (
        <>
          {" "}
          <section className="bg-light">
            <div className="container">
              <div className="border border-1 border-opacity-10 bg-white">
                <div>
                  <img src="./landing.jpg" alt="img" className="w-100 " style={{height: '200px',
    objectFit: 'cover'}}/>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <div className="text-dark text-center">
                      <img
                                  style={{width: "405px !important"}}
                        src="./abnour.png"
                        alt=""
                        className="abnourLogo"
/>
                    </div>
                    <div>
                      <Link href='/Jobs'>
                      <button
                        className="btn btn-info text-white p-2 px-5 me-3 jobsBtn"
                        >
                        <MdWork /> Jobs
                      </button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 mt-4 py-5 text-dark bg-white">
                <h4 className="mb-3 " style={{fontWeight: "500"}}>ABNOUR GROUP</h4>
                <p className="mb-4">A leader in innovative solutions</p>

                <h4 className="mb-3">About Us</h4>
                <p className="mb-4">
                  Dummy Company was founded in 2020 with a mission to provide
                  innovative solutions for a better tomorrow. We have a team of
                  experts in various fields who work together to bring
                  cutting-edge products and services to market. Our focus on
                  quality and customer satisfaction has made us a trusted name
                  in the industry.
                </p>

                <h4 className="mb-3">Our Products and Services</h4>
                <div className="mb-4">
                   
                  <div className='mb-2 products_title'>                Product   1: A revolutionary new technology that improves
                  efficiency and productivity Product.</div>
                        <div className='mb-2 products_title'>  Product 2: A user-friendly
                  platform that simplifies complex processes Service </div>
                  <div className='mb-2 products_title'>
                  Service 1: Customized consulting services to help businesses stay ahead
                  of the curve Service 
                  </div>
                    <div className='mb-2 products_title'>                  Service 2: Training and support to ensure the
                  successful adoption of our products</div>
                </div>

                <h4 className="mb-3">Our Team</h4>
                <p className="mb-4">
                  Dummy Company is powered by a talented and dedicated team of
                  professionals. Our team members bring a diverse set of skills
                  and experiences to the table, allowing us to tackle complex
                  challenges and deliver solutions that truly make a difference.
                  We are committed to fostering a positive and collaborative
                  work environment where everyone has the opportunity to grow
                  and succeed.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
