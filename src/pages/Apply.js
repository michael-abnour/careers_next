import { getSkills } from "@/store/Skills";
import { Box, Button, CircularProgress, Grid, InputLabel, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowRight, BsFileEarmarkArrowUp } from "react-icons/bs";
import {MdDone, MdOutlineWork, MdWork, MdWorkOutline} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles'

import Upload from "./Upload";
import toast, { Toaster } from 'react-hot-toast';
import { createJobApplication } from "@/store/JobApplications";
import Link from "next/link";
import AOS from "aos";
import DropzoneWrapper from './DropzoneWrapper'

import { useDropzone } from 'react-dropzone'

import "aos/dist/aos.css";



const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const Apply = ({setOpen, job}) => {
  const max1000px = useMediaQuery('(max-width:1000px)');
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [jobApp, setJobApp] = useState({
    jobId: job?.id,
    name: '',
    email: '',
    experience: '',
    applicationSkills: [''],
    currSalary: 0,
    currSalaryRate: '',
    expectedSalary: 0,
    expectedSalaryRate: '',
    noticePeriod: 0,
    source: '',
    location: '',
    phone: ''
  })
  const dispatch = useDispatch()
  const {Skills} = useSelector(state => state.Skills)

  useEffect(() => {
    dispatch(getSkills())
  }, [dispatch])

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);





  const [files, setFiles] = useState([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/pdf/*': ['.pdf', '.docx']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))

      // state from create job application page
      setFile(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const name = files.map(file => <span className='file-name'>{file.name} </span>)

    const Ext = files[0]?.name?.split('.')[1]

    const img = files.map(file => (
      <div
        style={{
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <img
          key={file.name}
          alt={file.name}
          className='single-file-image'
          src={`/${Ext}.png`}
          style={{ width: '130px', height: '130px', objectFit: 'contain', position: 'relative', objectFit: 'contain' }}
        />
        <span>File Name: {file.name}</span>
      </div>
    ))




  const handleCreate = async e => {
    e.preventDefault()
    setLoading(true)
    console.log(jobApp)

    const formData = new FormData()
    formData.append('resume', file[0])
    for (const key in jobApp) {
      if (key == 'applicationSkills') {
        for (let i = 0; i < jobApp[key].length; i++) {
          formData.append(`${key}[${i}]`, jobApp[key][i])
        }
        continue
      }
      formData.append(key, jobApp[key])
    }
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    console.log(file.length)

    if(file.length == 0){
        toast.error('Please Upload A File.', {
            duration: 2000
          })
          setLoading(false)
          return 
    }
    await dispatch(createJobApplication(formData)).then(res => {
      setLoading(false)
      switch (res?.payload?.resCode) {
        case 201:
          toast.success('Job Application Created Successfully', {
            duration: 2000
          })
          setIsCreated(true)
          setTimeout(() => {
            setIsCreated(true)
          }, 2000)
          break
        case 500:
          setOpen(!open)
          toast.error('Internal Server Error.', {
            duration: 2000
          })
          break
        default:
      }
    })
  }


  return (

    <>
    {isCreated ?     
    <div className={'successParent'} data-aos="fade-up" data-aos-duration="500">
      <img src='/done.svg' style={{width: "300px"}}/>
      <h2 className={'successMsg'}>
        Your Application has been submitted successfully <MdDone />
      </h2>
      <Link href={'/'}>
        <button className="btn btn-primary me-3 px-3 coloredBtn">
          Go Back To Home
        </button>
      </Link>
    </div> :     
    <section className="bg-light">
      <Toaster />
      <div className="container">
        <div className="border border-1 border-opacity-10 bg-white">
          <div>
            <img src="./landing.jpg" alt="img" className="w-100 " style={{height: "200px", objectFit: "cover"}}/>
          </div>
          <div>
          <Grid container sx={{paddingBottom: "10px"}}>
                    <Grid item xs={12} md={6} display= {"flex"} alignItems={"center"} justifyContent={max1000px ? "center" : "flex-start"}>
                      <img
                                  style={{width: "405px !important"}}
                        src="./abnour.png"
                        alt=""
                        className="abnourLogo"
/>
                    </Grid>
                    <Grid item xs={12} md={6} display= {"flex"} alignItems={"center"} justifyContent={max1000px ? "center" : "flex-end"}>
                      <button
                      onClick={() => {setOpen(false)}}
                        className="btn btn-info text-white p-2 px-5 me-3 jobsBtn"
                        >
                        <MdWork /> Jobs
                      </button>
                    </Grid>
                  </Grid>
          </div>
        </div>
      </div>

      <div className="text-dark py-5 mt-5 ">
        <div className="container bg-white border border-1 border-opacity-10 bg-white">
          
          <h6 className="py-3  px-0  bg-white text-center" style={{fontSize: '28px', borderBottom: '1px solid #EEE'}}>
         Applying To Job: {job?.designation?.DesignationName} {job?.job?.JobTitle}
          </h6>

          <h4 className="py-3  px-0  bg-white d-flex align-items-center gap-2">
          <BsFileEarmarkArrowUp />  Personal Information 

          </h4>
          <form  onSubmit={e => handleCreate(e)}>
            
          <div className="row">
            <div className="col-md-4">
              <div className="mb-4">
                <label for="name" className="form-label">
                  Full Name
                </label>
                <input
                required
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="e.g. John Doe"
                  value={jobApp.name}
                  onChange={e => {
                    setJobApp({ ...jobApp, name: e.target.value })
                  }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="email" className="form-label">
                  Email
                </label>
                <input
                required
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="e.g. johndoe@example.com"
                  value={jobApp.email}
                  onChange={e => {
                    setJobApp({ ...jobApp, email: e.target.value })
                  }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Mobile " className="form-label">
                  Mobile
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  id="Mobile "
                  defaultValue={0}
                  placeholder="e.g. 987654321"
                  value={jobApp.phone}
                  onChange={e => {
                    setJobApp({ ...jobApp, phone: parseInt(e.target.value) })
                  }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Location" className="form-label">
                  Current Location
                </label>
                <input
                  type="text"
                  required={"true"} 
                  className="form-control"
                  id="Location"
                  placeholder="e.g. California"
                  value={jobApp.location}
                  onChange={e => {
                    setJobApp({ ...jobApp, location: e.target.value })
                  }}
                />
              </div>
            </div>


            <div className="col-md-4">
              <div className="mb-4">
                <label for="skills " className="form-label">
                  Your skills
                </label>
            <Select
              size='small'
              fullWidth
              required
              multiple
              value={jobApp?.applicationSkills?.length > 0 ? jobApp?.applicationSkills : ['']}
              onChange={e => {
                if (e.target.value === '') {
                  setJobApp({ ...jobApp, applicationSkills: [] })
                } else {
                  let test = e.target.value.filter(el => {
                    return el != ''
                  })
                  setJobApp({ ...jobApp, applicationSkills: test })
                }
              }}
              defaultValue=''
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value=''>
                <span>Choose Skills</span>
              </MenuItem>
              {Skills?.length ? Skills?.map(el => <MenuItem value={el.id}>{el.skillName}</MenuItem>) : null}
            </Select>{' '}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Experience " className="form-label">
                  Total Experience
                </label>
                <Select
              size='small'
              fullWidth
              required
              defaultValue=''
              value={jobApp.experience}
              onChange={e => {
                setJobApp({ ...jobApp, experience: e.target.value })
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value=''>
                <span>Choose Work Experience</span>
              </MenuItem>
              <MenuItem value={"Fresher"}>Fresher</MenuItem>
              <MenuItem value={"0-1 Years"}>0-1 Years</MenuItem>
              <MenuItem value={"1-3 Years"}>1-3 Years</MenuItem>
              <MenuItem value={"3-5 Years"}>3-5 Years</MenuItem>
              <MenuItem value={"5+ Years"}>5+ Years</MenuItem>
            </Select>{' '}
              </div>
            </div>



            <div className="col-md-4">
              <div className="mb-4">
                <label for="Current " className="form-label">
                  Current Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Current "
                  placeholder="current Salary"
                  required
                  value={jobApp.currSalary}
                  onChange={e => {
                    setJobApp({ ...jobApp, currSalary: e.target.value })
                  }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Rate " className="form-label">
                  Current Salary Rate
                </label>
                <Select
              size='small'
              fullWidth
              defaultValue={'10'}
              required
              displayEmpty
              value={jobApp.currSalaryRate}
              onChange={e => {
                setJobApp({ ...jobApp, currSalaryRate: e.target.value })
              }}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={''}>
                <span>--</span>
              </MenuItem>
              <MenuItem value={'Per Hour'}>Per Hour</MenuItem>
              <MenuItem value={'Per Week'}>Per Week</MenuItem>
              <MenuItem value={'Per Month'}>Per Month</MenuItem>
              <MenuItem value={'Per Year'}>Per Year</MenuItem>
            </Select>{' '}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="expected " className="form-label">
                  Expected Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expected "
                  required
                  placeholder="expected ctc"
                  value={jobApp.expectedSalary}
                  onChange={e => {
                    setJobApp({ ...jobApp, expectedSalary: e.target.value })
                  }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="1" className="form-label">
                  Expected Salary Rate
                </label>
                <Select
              size='small'
              fullWidth
              defaultValue={10}
              displayEmpty
              required
              value={jobApp.expectedSalaryRate}
              onChange={e => {
                setJobApp({ ...jobApp, expectedSalaryRate: e.target.value })
              }}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={10}>
                <span>--</span>
              </MenuItem>
              <MenuItem value={'Per Hour'}>Per Hour</MenuItem>
              <MenuItem value={'Per Week'}>Per Week</MenuItem>
              <MenuItem value={'Per Month'}>Per Month</MenuItem>
              <MenuItem value={'Per Year'}>Per Year</MenuItem>
            </Select>{' '}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="Notice" className="form-label">
                  Notice Period
                </label>
                <Select
              size='small'
              fullWidth
              defaultValue={''}
              displayEmpty
              required
              inputProps={{ 'aria-label': 'Without label' }}
              value={jobApp.noticePeriod}
              onChange={e => {
                setJobApp({ ...jobApp, noticePeriod: e.target.value })
              }}
            >
              <MenuItem value={''}>
                <span>--</span>
              </MenuItem>
              <MenuItem value={'15'}>15 Days</MenuItem>
              <MenuItem value={'30'}>1 Month</MenuItem>
              <MenuItem value={'60'}>2 Month</MenuItem>
              <MenuItem value={'90'}>3 Month</MenuItem>
            </Select>{' '}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label for="ApplicationSource" className="form-label">
                  From where did you hear about us?
                </label>
                <Select
              size='small'
              fullWidth
              defaultValue={''}
              id='ApplicationSource'
              displayEmpty
              required
              inputProps={{ 'aria-label': 'Without label' }}
              value={jobApp.source}
              onChange={e => {
                setJobApp({ ...jobApp, source: e.target.value })
              }}
            >
              <MenuItem value={''}>
                <span>--</span>
              </MenuItem>
              <MenuItem value={'Facebook'}>Facebook</MenuItem>
              <MenuItem value={'Instagram'}>Instagram</MenuItem>
              <MenuItem value={'Whatsapp'}>Whatsapp</MenuItem>
              <MenuItem value={'LinkedIn'}>LinkedIn</MenuItem>
            </Select>{' '}
              </div>
            </div>

            <div className="col-md-12">
            <label htmlFor="Resume" className="mb-2">Resume</label>
            <DropzoneWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <>
              <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 200 } : {}}>
                <input  {...getInputProps()} />
                  

                {files.length ? (
                  img
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    <Img width={300} alt='Upload img' src='/upload.png' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                      <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                      <Typography color='textSecondary'>
                        Drop files here or click{' '}
                        <Link href='/' onClick={handleLinkClick}>
                          browse
                        </Link>{' '}
                        thorough your machine
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {files?.length ? (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button
                    sx={{ background: '#ff473a', color: '#FFF', width: '250px', mt: 3 }}
                    onClick={() => {
                      setFiles([])
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : null}
            </>
          </Grid>
        </Grid>
      </DropzoneWrapper>

            {/* <Upload file={file} setFile={setFile} /> */}
            </div>


            <div className="col-md-12">
              <div className="my-4">
                <label htmlFor="Cover"  className="mb-2">Cover Letter (optional)</label>
                <textarea className="form-control" accordion
                              value={jobApp.coverLetter}
                              onChange={e => {
                                setJobApp({ ...jobApp, coverLetter: e.target.value })
                              }}
                               required={true} id='Cover' placeholder="Enter some information about your experience" rows="5"></textarea>
              </div>
            </div>
          </div>
          <div className="text-dark">
            <h2 className="mb-3">Terms and Conditions: </h2>
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
            <button type='submit' className="btn btn-primary me-3 px-3 coloredBtn" style={{width: "160px"}}>
            {loading ? (
                <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Loading... <CircularProgress size={23} sx={{ color: '#FFF', ml: 2 }} />
                </div>
              ) : (
                'Submit'
              )}

            </button>
            <button className="btn btn-light my-5 px-3" style={{width: "120px"}} onClick={() => {setOpen(false)}}>Cancel</button>
          </div>
          </form>

        </div>
      </div>

      <div></div>
    </section>}


    </>
  );
};

export default Apply;
