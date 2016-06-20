import React from 'react';

var CheckPoint = (props) => {
	if(props.flag){
		return(
			<div>
			That was easy...
				<svg className='checkPointSVG' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
					<circle className="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
					<polyline className="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
				</svg>
			</div>
		)
	} else if(props.flag === false){
			return (
			<div>
				Nope...
				<svg className='checkPointSVG' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
				  <circle className="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
				  <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
				  <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
				</svg>
			</div>
			)
	} else{
		//noscript or null here...
		return (<noscript />);
	}
};

export default CheckPoint;