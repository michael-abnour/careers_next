import React from "react";
import {MdWork} from "react-icons/md"

const Apply = ({setOpen, job}) => {
  return (
    <section className="bg-light">
      <div className="container">
        <div className="border border-1 border-opacity-10 bg-white">
          <div>
            <img src="./landing.jpg" alt="img" className="w-100 " style={{height: "200px", objectFit: "cover"}}/>
          </div>
          <div>
            <div className="d-flex justify-content-between align-items-center p-2">
              <div className="text-dark text-center  py-2 ">
              <img
                        src="./abnour.png"
                        alt=""
            className="abnourLogo"

/>
              </div>
              <div>
                <button
                  className="btn btn-info text-white p-2 px-5 me-3 jobsBtn"
                >
                        <MdWork /> Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-dark py-5 mt-5 ">
        <div className="container bg-white border border-1 border-opacity-10 bg-white">
          
          <h2 className="py-3  px-0  bg-white">
          Job Title : {job.jobTitle}
          </h2>

          <h2 className="py-3  px-0 border-bottom border-1 border-opacity-10 bg-white">
            Personal Information 

          </h2>
          <div className="row">
            <div className="col-md-4">
              <div className="mb-4">
                <label for="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="e.g. johndoe@example.com"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Mobile " className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Mobile "
                  placeholder="e.g. 987654321"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="skills " className="form-label">
                  Your skills
                </label>
                <select id="skills" className="form-select">
                  <option selected>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Experience " className="form-label">
                  Total Experience
                </label>
                <select id="Experience" className="form-select">
                  <option selected>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Location " className="form-label">
                  Current Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Location "
                  placeholder="e.g. California"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Current " className="form-label">
                  Current CTC €
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Current "
                  placeholder="current ctc"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Rate " className="form-label">
                  Current CTC Rate
                </label>
                <select id="Rate" className="form-select">
                  <option selected>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="expected " className="form-label">
                  Expected CTC €
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expected "
                  placeholder="expected ctc"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="1" className="form-label">
                  Expected CTC Rate
                </label>
                <select id="1" className="form-select">
                  <option selected>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Notice" className="form-label">
                  Notice Period
                </label>
                <select id="Notice" className="form-select">
                  <option selected>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="about" className="form-label">
                  From where did you hear about us?
                </label>
                <select id="about" className="form-select">
                  <option selected>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div md={12}>
              <div className="my-4">
                <label htmlFor="">Cover Letter</label>
                <textarea className="form-control" rows="5"></textarea>
              </div>
            </div>
          </div>
          <div className="text-dark">
            <h2 className="mb-5">Terms And Condition</h2>
            <p>
              If any provision of these Terms and Conditions is held to be
              invalid or unenforceable, the provision shall be removed (or
              interpreted, if possible, in a manner as to be enforceable), and
              the remaining provisions shall be enforced. Headings are for
              reference purposes only and in no way define, limit, construe or
              describe the scope or extent of such section. Our failure to act
              with respect to a breach by you or others does not waive our right
              to act with respect to subsequent or similar breaches. These Terms
              and Conditions set forth the entire understanding and agreement
              between us with respect to the subject matter contained herein and
              supersede any other agreement, proposals and communications,
              written or oral, between our representatives and you with respect
              to the subject matter hereof, including any terms and conditions
              on any of customer's documents or purchase orders. No Joint
              Venture, No Derogation of Rights. You agree that no joint venture,
              partnership, employment, or agency relationship exists between you
              and us as a result of these Terms and Conditions or your use of
              the Site. Our performance of these Terms and Conditions is subject
              to existing laws and legal process, and nothing contained herein
              is in derogation of our right to comply with governmental, court
              and law enforcement requests or requirements relating to your use
              of the Site or information provided to or gathered by us with
              respect to such use.
            </p>
          </div>
          <div className="form-check mt-5 pb-3  border-bottom border-1 border-opacity-10 ">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              I agree with the above Terms and Conditions
            </label>
          </div>

          <div>
            <button className="btn btn-primary my-5 me-3 px-3">Apply</button>
            <button className="btn btn-light my-5 px-3" onClick={() => {setOpen(false)}}>Cancel</button>
          </div>
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default Apply;
