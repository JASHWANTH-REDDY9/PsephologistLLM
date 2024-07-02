import React from 'react';

const Content = ({ selected }) => {
    const contentMap = {
        1: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                Bar Plot
                <img src="http://127.0.0.1:5000/plot/sa-bar.png" alt="Sentiment Pie Chart" style={{ width: '70%' }} /></div>
                <img src="http://127.0.0.1:5000/plot/sa-pie.png" alt="Sentiment Distribution" style={{ width: '40%' }} />
                
            </div>
        ),
        2: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <img src="http://127.0.0.1:5000/plot/sa-bar1.png" alt="Sentiment Pie Chart" style={{ width: '40%' }} />
                <img src="http://127.0.0.1:5000/plot/sa-pie1.png" alt="Sentiment Distribution" style={{ width: '40%' }} />
            </div>
        ),
        3: 'Content for Button 3',
        4: 'Content for Button 4',
        5: 'Content for Button 5',
        6: 'Content for Button 6',
        7: 'Content for Button 7',
        8: 'Content for Button 8',
    };

    return (
        <div style={{ flex: '1', padding: '20px' }}>
            {contentMap[selected] || 'Select a button to see the content'}
        </div>
    );
};

export default Content;
