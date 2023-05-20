import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Apply from "./Apply";
import { useState } from "react";
import {MdOutlineMonetizationOn, MdWork} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { getHiringJobs } from "@/store/HiringJobs";
import {FcMindMap, FcSelfServiceKiosk} from 'react-icons/fc'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {BsBookmarkCheck, BsShare} from 'react-icons/bs'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import ReactDraftWysiwyg from '../Components/ReactDraftWysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Grid, MenuItem, Select, useMediaQuery } from "@mui/material";
const Job = ({ close }) => {
  const [create, setCreate] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const max1000px = useMediaQuery('(max-width:1000px)');

  const [activeItem, setActiveItem] = useState({})
  const theJobs = [
    {jobId: "1", jobTitle: "Frontend Developer", Department: "Developers", SalrayRange: "155$ - 200$", experience: "1-3 Years", skills: ["Html", 'Css', "JavaScript", "React Js"]},
    {jobId: "2", jobTitle: "Backend Developer", Department: "Developers", SalrayRange: "180$ - 200$", experience: "1-2 Years", skills: ["Html", 'Css', "JavaScript", "React Js"]},
    {jobId: "3", jobTitle: "DevOps Developer", Department: "Developers", SalrayRange: "130$ - 220$", experience: "1 Year", skills: ["Html", 'Css', "JavaScript", "React Js"]},
    {jobId: "4", jobTitle: "Project Manager", Department: "Developers", SalrayRange: "150$ - 280$", experience: "2-5 Years", skills: ["Business Analysis", 'System Design', "JavaScript", "System Analysis"]},
  ]
  const {HiringJobs} = useSelector((state) => state.HiringJobsSlice)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHiringJobs())
  }, [dispatch])

  useEffect(() => {
    setActiveItem(HiringJobs[0])

    if (activeItem?.description) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(activeItem?.description))))
    }

  }, [HiringJobs])


  const handleSetActiveItem = (el) => {
    setActiveItem(el)

    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(el?.description))))

  }

  console.log(HiringJobs)
  return (
    <>
      {create ? (
       <Apply setOpen={setCreate} job={activeItem}/>
      ) : (
        <>
        <div className="small_nav">
        <div className="col-sm-12 col-lg-3"><img className="Img" src="./abnour.png" width={200} style={{width: "200px !important"}}/></div>
        <div className="col-sm-12 col-lg-3 Title text-center HeaderName">ABNOUR GROUP</div>
        </div>
          <section className="bg-light" style={{paddingTop: '80px'}}>
            <div className="">
              <div className="container py-5  bg-white border border-1 border-opacity-10">
                <div className="row align-items-center">
                  <div className="col-md-4 col-lg-2 mb-3">
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

                  <div className="col-md-4 col-lg-2 mb-3" >
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

                  <div className="col-md-4 col-lg-2 mb-3">
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

                  <div className="col-md-4 col-lg-2 mb-3">
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

                  <div className="col-md-4 col-lg-2 mb-3">
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

                  <div className="col-md-4 col-lg-2 mb-3 mt-5">
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

            <div >
              <div className="container mt-5 bg-white rounded-2" style={{  minHeight: '100vh !important',  height: 'fit-content !important'}}>
              {max1000px ? 
              (<div className="row d-flex flex-column py-4">
                <div className="col-sm-12">
                <div className="mb-4">
                <label for="ApplicationSource" className="form-label">
                  Choose Job
                </label>
                <Select
              size='small'
              fullWidth
              defaultValue={''}
              id='ApplicationSource'
              displayEmpty
              required
              inputProps={{ 'aria-label': 'Without label' }}
              value={activeItem?.id}
            >
              <MenuItem value={''}>
                <span>--</span>
              </MenuItem>
                {HiringJobs?.length != undefined ? 
                 HiringJobs?.map((el) => {
                  return (
                    <MenuItem onClick={() => {handleSetActiveItem(el)}} value={el.id}>{el?.designation?.DesignationName} {el?.job?.JobTitle}</MenuItem>
                  )
                 })
                 : null}
            </Select>{' '}
              </div>
                </div>
                <div className="col-sm-12 overflow-y-scroll">
                <div className="text-dark py-5 px-3" style={{fontSize: '19px'}}>
                      <Grid container  className="" rowGap={{xs:1, md:1}} >
                        <Grid item xs={12} lg={6}>
                        <h2 className=""><FcMindMap size={30} className="me-2"/>{activeItem?.designation?.DesignationName} {activeItem?.job?.JobTitle}</h2>

                        </Grid>
                        <Grid item xs={12} lg={6} marginBottom={{xs:2}}>
                        <button style={{width: "100%"}} onClick={()=>{setCreate(true)}} className="btn btn-primary ">
                          <BsBookmarkCheck />  Apply
                          </button>
                        </Grid>

                      </Grid>

                      <span className="me-3"><FcSelfServiceKiosk /> {activeItem?.experience}</span>
                      <span className="me-3"><FaMapMarkerAlt/> Cairo, Egypt</span>


                      <p className="mt-2 d-flex align-items-center"><MdOutlineMonetizationOn />{activeItem?.minSalary} - {activeItem?.maxSalary}</p>

                      <p className="mb-2">Skills Required:</p>

                 
                      {activeItem?.HiringJobSkills?.map((el) => {
                          return (
                            <span className="d-flex align-items-center gap-2"><AiOutlineArrowRight />{el?.skill?.skillName}</span>
                          )                          
                        })}
                       
                      <h5 className="mb-2 mt-4" style={{    borderBottom: '1px solid #8c8b8b',paddingBottom: '10px'}}>Job Description:</h5>
                        {/* {activeItem?.description} */}
                        <div >
                          

                        <ReactDraftWysiwyg
                    toolbarHidden
                    readOnly={true}
                    editorState={editorState}
                    toolbarClassName='toolbarClassName'
                    wrapperClassName='wrapperClassName'
                    editorClassName='editorClassName'
                    // onEditorStateChange={updateTextDescription}
                    />
                    </div>
                    </div>
                </div>
              </div>) :
                <div className="row">
                  <div className="col-md-4">
                    <div className="row jobsCol">
                      {
                        HiringJobs.length !== undefined ? HiringJobs?.map((el) => {
                          return (
                            <div onClick={() => {handleSetActiveItem(el)}} className={`col-md-12 jobBox ${activeItem?.id === el?.id ? "activeItem" : ""}`}>
                            <div className="py-4 px-2 text-dark ">
                              <h5 className="mb-2">{el?.designation?.DesignationName} {el?.job?.JobTitle}</h5>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="text-start">Trainee</div>
                              </div>
                              <span>ABNOUR Group</span>

                              <div className="text-start mt-4"><FaMapMarkerAlt /> Cairo, Egypt</div>


                            </div>
                          </div>
                          )
                        }) : null
                      }

                    </div>
                  </div>

                  <div className="col-md-8" >
                    <div className="text-dark py-5 px-3" style={{fontSize: '19px'}}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-2"><FcMindMap size={30} className="me-2"/>{activeItem?.designation?.DesignationName} {activeItem?.job?.JobTitle}</h2>
                        <div>
                          <button className="btn btn-light px-4 py-2 me-3 d-inline-flex gap-2 align-items-center">
                          <BsShare />  Share Link
                          </button>
                          <button onClick={()=>{setCreate(true)}} className="btn btn-primary px-4 py-2 d-inline-flex gap-2 align-items-center">
                          <BsBookmarkCheck />  Apply
                          </button>
                        </div>
                      </div>

                      <span className="me-3"><FcSelfServiceKiosk /> {activeItem?.experience}</span>
                      <span className="me-3"><FaMapMarkerAlt/> Cairo, Egypt</span>


                      <p className="mt-2 d-flex align-items-center"><MdOutlineMonetizationOn />{activeItem?.minSalary} - {activeItem?.maxSalary}</p>

                      <p className="mb-2">Skills Required:</p>

                 
                      {activeItem?.HiringJobSkills?.map((el) => {
                          return (
                            <span className="d-flex align-items-center gap-2"><AiOutlineArrowRight />{el?.skill?.skillName}</span>
                          )                          
                        })}
                       
                      <h5 className="mb-2 mt-4" style={{    borderBottom: '1px solid #8c8b8b',paddingBottom: '10px'}}>Job Description:</h5>
                        {/* {activeItem?.description} */}
                        <div >
                          

                        <ReactDraftWysiwyg
                    toolbarHidden
                    readOnly={true}
                    editorState={editorState}
                    toolbarClassName='toolbarClassName'
                    wrapperClassName='wrapperClassName'
                    editorClassName='editorClassName'
                    // onEditorStateChange={updateTextDescription}
                    />
                    </div>
                    </div>
                  </div>
                </div>}


              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Job;
