import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './index.css'

export default function Filter(props) {
    const { dataTobeFilter, filterModel, clearFilter, pageChange } = props
    // Drop down for filter
    const [filterDropDowns, setFilterDropDowns] = useState({
        model: [],
        color: [],
        location: [],
    })
    // form field
    const [filterfield, setFilterfield] = useState({
        model: "",
        color: "",
        location: "",
        ratingAvg: ""
    })
    // Set filter dropdown
    useEffect(() => {
        const setDropDown = () => {
            let modelDrop = []
            let colorDrop = []
            let locationDrop = []
            dataTobeFilter.forEach(element => {
                modelDrop.push(element.model)
                colorDrop.push(element.color)
                locationDrop.push(element.location)
            });
            setFilterDropDowns({
                model: modelDrop,
                color: colorDrop,
                location: locationDrop,
            })
        }
        setDropDown()
    }, [dataTobeFilter])
    // to handle the change in field
    const handleChange = (e) => {
        const { name, value } = e.target
        setFilterfield({
            ...filterfield,
            [name]: value
        })
    }
    // Filter
    const handleSearch = () => {
        filterModel(filterfield)
    }
    // clear filter
    const handleClearFilter = () => {
        setFilterfield({
            model: "",
            color: "",
            location: "",
            ratingAvg: ""
        })
        clearFilter()
    }
    // page change
    useEffect(() => {
        setFilterfield({
            model: "",
            color: "",
            location: "",
            ratingAvg: ""
        })
    }, [pageChange])

    return (
        // model, color, location, or rate averages
        <div className='filterContainer ml-2  bg-light'>
            <div className='filterHeading pt-4 pr-3 pl-3'>
                <h5 className='webFont pl-2 flexGrow1' >Filter</h5>
                <p
                    className='webFont pl-2  text-danger flexGrow8 cursorPointer'
                    onClick={handleClearFilter}
                >
                    <u>Reset Search</u>
                </p>
            </div>
            <hr />
            <div className='filterHeading'>
                {/* Model */}
                <Accordion className={"w100"}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Model</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <select className="form-select" value={filterfield.model} name="model" onChange={handleChange}>
                            <option value="">Select</option>
                            {filterDropDowns.model && filterDropDowns.model.map((e, i) =>
                                <option value={e} key={i}>{e}</option>
                            )}
                        </select>
                    </AccordionDetails>
                </Accordion>


            </div>
            <div className='filterHeading mt-3'>
                {/* Color */}
                <Accordion className={"w100"}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Color</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <input type="color" className='form-control' value={filterfield.color} readOnly disabled />
                        <div className='m-2'>Select From :</div>
                        <div className='d-flex'>
                            {filterDropDowns.color && filterDropDowns.color.map((e, i) =>
                                <button
                                    className='colorDivFilter m-2 cursorPointer '
                                    style={{ backgroundColor: e }}
                                    onClick={() => {
                                
                                        setFilterfield({
                                            color: e
                                        })
                                    }}
                                    key={i}
                                ></button>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>

            </div>
            <div className='filterHeading mt-3'>
                {/* Color */}
                <Accordion className={"w100"}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Location</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <select className="form-select" value={filterfield.location} name="location" onChange={handleChange}>
                            <option value="">Select</option>
                            {filterDropDowns.location && filterDropDowns.location.map((e, i) =>
                                <option value={e} key={i}>{e}</option>
                            )}
                        </select>
                    </AccordionDetails>
                </Accordion>

            </div>
            <div className='filterHeading mt-3'>
                {/* Color */}
                <Accordion className={"w100"}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Average Rate</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <select className="form-select" value={filterfield.ratingAvg} name="ratingAvg" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </AccordionDetails>
                </Accordion>

            </div>
            <hr />
            <div className='text-center pb-4'>
                <button className='btn btn-success mt-3' onClick={handleSearch}>
                    Search Bike <i className="fa fa-arrow-right pl-2"></i>
                </button>

            </div>
        </div>

    )
}

