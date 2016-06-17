import React, {Component} from 'react';
import {connect} from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/ruby';


const style = {
	output:{
		width:'200px',
		height: '308px',
		marginTop:'25px',
		marginBottom:'20px',
		border:' 4px solid #EEEFF2',
		background:'black',
		color:'red', 
		display:'inline',
		fontweight: '600',
	},
	compiler:{
		display: 'flex',
		alignItems: 'center',
	},
	button:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '10%px', 
		height: '30px',
		margin: '20px', 
		padding: '4px',
		margin:' 20px',
	},
	editor:{
		height: '308px',
		marginTop:'25px',
		marginBottom:'20px',
		border:' 4px solid #EEEFF2',
		alignItems: 'center',
	}
}


class Algorithms extends Component {

	constructor(props){
	super(props);
	this.state = {
		editorContents: 'function toyProblem(a,b){ \n //enter code here \n }',
		language: 'javascript',
		error: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
		};
		this.editorChanged = this.editorChanged.bind(this);
		this.runCode = this.runCode.bind(this);
	}
	editorChanged(editorContents){
		this.setState({ editorContents })
	}
	runCode(){
		//new Function ([arg1[, arg2[, ...argN]],] functionBody)
		var userFunction;
		var index = this.state.editorContents.indexOf('{');
		var lastIndex = this.state.editorContents.lastIndexOf('}');
		var functionBody = this.state.editorContents.substring(index+1,lastIndex);
		try{
			this.setState({error:''});
				userFunction = new Function(functionBody);
		}
		catch(err){
			console.log(err);
			this.setState({error:'Syntax Error cannot run'});
		}
		console.log('this is the editor contents',userFunction);
	}

	render(){

		return (
			<div className='newBackground' style={{overflow: 'scroll'}}>
				<div>
					<div  style={{color:'black', margin:'20px'}}>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					</div>
						<span style={style.compiler}>
							<div style={style.output}>{this.state.error}</div>
							<div style={style.editor}>
								<AceEditor
									height={'300px'}
									fontSize={10}
									value={this.state.editorContents}
								  mode="javascript"
								  theme="github"
								  onChange={this.editorChanged}
								  name="ACE_EDITOR"
								  editorProps={{$blockScrolling: true}}
								/>
							</div>
						</span>
						<button onClick={this.runCode} style={style.button}>Run</button>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	return {}
}
export default connect(mapStateToProps)(Algorithms);