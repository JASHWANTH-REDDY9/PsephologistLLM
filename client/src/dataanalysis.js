import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import data from './components/extracted_data.json'; // Adjust the path as needed

const Dataanalysis = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [states, setStates] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        // This effect could be used to fetch initial data or perform setup actions
    }, []);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedYear('');
        setSelectedState('');
        setSelectedConstituency('');
        setStates([]);
        setConstituencies([]);
    };

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
        setSelectedState('');
        setSelectedConstituency('');
        setConstituencies([]);
        if (year) {
            const yearData = data[year];
            const stateNames = yearData.map(item => Object.keys(item)[0]);
            console.log('State Names:', stateNames); // Debugging log to inspect state names
            setStates(stateNames);
        } else {
            setStates([]);
        }
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedConstituency('');
        console.log(`Selected Year: ${selectedYear}, Selected State: ${state}`);

        if (selectedYear && data[selectedYear]) {
            const stateData = data[selectedYear].find(item => item[state]);
            if (stateData) {
                const newConstituencies = stateData[state];
                console.log('Extracted Constituencies:', newConstituencies); // Debugging log to inspect constituencies
                setConstituencies(newConstituencies);
            } else {
                console.log("No constituencies found or data structure mismatch.");
                setConstituencies([]);
            }
        }
    };

    const handleAnalyze = () => {
        // Simulate analysis functionality
        const result = `Analysis for ${selectedType} in ${selectedYear}, ${selectedState}, ${selectedConstituency}`;
        console.log('Analyzing:', {
            type: selectedType,
            year: selectedYear,
            state: selectedState,
            constituency: selectedConstituency,
        });
        setAnalysisResult(result);
    };

    const years = Object.keys(data);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
                <h1 style={{marginLeft:'37%'}}>Indian Election analysis</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
                <div className="btn btn-primary shadow" style={{margin:'4%'}}>
                    <label htmlFor="select-type">Select Type:</label>
                    <select id="select-type" value={selectedType} onChange={handleTypeChange} className="form-control">
                        <option value="">Select</option>
                        <option value="state">State</option>
                        <option value="constituency">Constituency</option>
                        <option value="voter">Voter</option>
                    </select>
                </div>
                {/* <div style={{margin:'4%'}}></div> */}
                {selectedType === 'state'  && (
                    <>
                        <div className="btn btn-primary shadow" style={{margin:'4%'}}>
                            <label htmlFor="select-year">Select Year:</label>
                            <select id="select-year" value={selectedYear} onChange={handleYearChange} className="form-control">
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div style={{margin:'4%'}}></div> */}
                        {selectedYear && (
                            <>
                                <div className="btn btn-primary shadow" style={{margin:'4%'}}>
                                    <label htmlFor="select-state">Select State:</label>
                                    <select id="select-state" value={selectedState} onChange={handleStateChange} className="form-control">
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state.replace(/_/g, ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div style={{margin:'4%'}}></div> */}
                                {selectedState && Array.isArray(constituencies) && (
                                    <>
                                        <div className="btn btn-primary shadow" style={{margin:'4%'}}>
                                            <label htmlFor="select-constituency">Select Constituency:</label>
                                            <select id="select-constituency" value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)} className="form-control">
                                                <option value="">Select Constituency</option>
                                                {constituencies.map((constituency) => (
                                                    <option key={constituency} value={constituency}>
                                                        {typeof constituency === 'string' ? constituency.replace(/_/g, ' ') : String(constituency)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <div style={{margin:'4%'}}></div> */}
                                        <button onClick={handleAnalyze} className="btn btn-light" style={{margin:'4%'}}>Analyze</button>
                                        
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '54vh', justifyContent:'center',alignItems:'center' }}>
            {analysisResult && <div><p>Analysis Result: {analysisResult}</p></div>}
            </div>
            <Footer />
        </div>
    );
};

export default Dataanalysis;
