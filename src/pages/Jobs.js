import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Apply from "./Apply";
import { useState } from "react";
import {MdWork} from "react-icons/md"

const Job = ({ close }) => {
  const [create, setCreate] = useState(false);
  const [activeItem, setActiveItem] = useState({})
  const theJobs = [
    {jobId: "1", jobTitle: "Frontend Developer", Department: "Developers", SalrayRange: "155$ - 200$", experience: "1-3 Years", skills: ["Html", 'Css', "JavaScript", "React Js"]},
    {jobId: "2", jobTitle: "Backend Developer", Department: "Developers", SalrayRange: "180$ - 200$", experience: "1-2 Years", skills: ["Html", 'Css', "JavaScript", "React Js"]},
    {jobId: "3", jobTitle: "DevOps Developer", Department: "Developers", SalrayRange: "130$ - 220$", experience: "1 Year", skills: ["Html", 'Css', "JavaScript", "React Js"]},
    {jobId: "4", jobTitle: "Project Manager", Department: "Developers", SalrayRange: "150$ - 280$", experience: "2-5 Years", skills: ["Business Analysis", 'System Design', "JavaScript", "System Analysis"]},

  ]
  return (
    <>
      {create ? (
       <Apply setOpen={setCreate} job={activeItem}/>
      ) : (
        <>
        <div className="small_nav">
        <div><img className="Img" src="./abnour.png" width={200} style={{width: "200px !important"}}/></div>
        <div className="Title">ABNOUR Software House</div>
        <div className="Button"><button>Go To Dashboard</button></div>
        </div>
          <section className="bg-light" style={{paddingTop: '80px'}}>
            <div className="">
              <div className="container py-5  bg-white border border-1 border-opacity-10">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <h5 className="text-dark mb-3">Department</h5>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <h5 className="text-dark mb-3">Job Type</h5>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <h5 className="text-dark mb-3">Work Experience</h5>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <h5 className="text-dark mb-3">Job Category</h5>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <h5 className="text-dark mb-3">Remote Job</h5>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2 mt-5">
                    <div>
                      <button className="btn btn-primary me-5 px-3 py-2">
                        Apply
                      </button>
                      <button className="btn btn-light px-3 py-2">Clear</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vh-100 ">
              <div className="container vh-100 mt-5 bg-white rounded-2">
                <div className="row">
                  <div className="col-md-4">
                    <div className="row">
                      {
                        theJobs.length !== undefined ? theJobs?.map((el) => {
                          return (
                            <div onClick={() => {setActiveItem(el)}} className={`col-md-12 jobBox ${activeItem.jobId === el.jobId ? "activeItem" : ""}`}>
                            <div className="py-5 px-2 text-dark ">
                              <h5 className="mb-2">{el.jobTitle}</h5>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="text-start">Trainee</div>
                                <div className="text-end">{el.Department}</div>
                              </div>
                              <span>ABNOUR SOFTWARE HOUSE</span>
                            </div>
                          </div>
                          )
                        }) : null
                      }

                    </div>
                  </div>

                  <div className="col-md-8" >
                    <div className="text-dark py-5 px-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-2">{activeItem?.jobTitle}</h4>
                        <div>
                          <button className="btn btn-light px-4 py-2 me-3">
                            Share Link
                          </button>
                          <button onClick={()=>{setCreate(true)}} className="btn btn-primary px-4 py-2">
                            Apply
                          </button>
                        </div>
                      </div>

                      <span className="me-3"> {activeItem?.experience}</span>


                      <p className="mt-2">{activeItem?.SalrayRange}</p>

                      <p className="mb-2">Skills Required</p>

                      <ul>
                      {activeItem?.skills?.map((el) => {
                          return (
                            <li>{el}</li>
                          )                          
                        })}
                        </ul>
                      <h5 className="mb-2">Description</h5>
                      <p>
                        Qui delectus asperiores est quia ducimus corporis.
                        Similique repellendus voluptatem quisquam molestiae
                        libero quasi sint illo. Aut voluptas earum saepe. Vel
                        iusto praesentium quis sunt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Job;
