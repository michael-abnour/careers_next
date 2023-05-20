// ** MUI Imports
import Grid from '@mui/material/Grid'
import DropzoneWrapper from './DropzoneWrapper'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Button } from '@mui/material'

// Styled component for the upload image inside the dropzone area
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

const Upload = ({ file, setFile }) => {
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

    return (
      <DropzoneWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <>
              <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 200 } : {}}>
                <form onSubmit={(e) => e.preventDefault()}>
                <input required {...getInputProps()} />
                  
                </form>

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
    )
}

export default Upload
